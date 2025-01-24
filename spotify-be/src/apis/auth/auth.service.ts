import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { ILoginResponse, ISignToken } from 'src/interfaces/auth.interface';
import { User } from './schemas/auth.schemas';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly authModel: Model<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<User> {
    const { fullName, email, username, phone, password, confirmPasswd } = signupDto;

    try {
      const existingUser = await this.authModel.findOne({ email });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const matchPassword = password === confirmPasswd;
      if (!matchPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      const hashedPassword = await argon.hash(password);

      let payload = new this.authModel({
        fullName,
        email,
        username,
        phone,
        password: hashedPassword,
        confirmPasswd: hashedPassword
      });

      payload = await payload.save();

      return payload;
    } catch (error: any) {
      console.error(error);
      throw new BadRequestException('Error while creating account');
    }
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const { email, password } = loginDto;

    try {
      const existingUser = await this.authModel.findOne({ email });
      if (!existingUser) {
        throw new BadRequestException('User not found');
      }
      const matchPassword = await argon.verify(existingUser.password, password);
      if (!matchPassword) {
        throw new BadRequestException('Invalid email or password');
      }

      const payload: ILoginResponse = {
        id: existingUser._id,
        username: existingUser.username,
        email,
        role: existingUser.role,
        token: '',
      };

      const token = await this.signToken(payload);
      payload.token = token;

      return payload;
    } catch (error: any) {
      console.error(`Error while logging in ${error}`);
      throw new BadRequestException('Error while logging in');
    }
  }

  async signToken(payload: ISignToken) {
    const secret = this.config.get<string>('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });

    return token;
  }
}