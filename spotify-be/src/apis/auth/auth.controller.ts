import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { Cookie } from 'src/utils/cookie.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({ status: 201, description: 'Account created succesful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  signup(@Body() signDto: SignupDto) {
    console.log(signDto);
    return this.authService.signUp(signDto);
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Login succesful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const dataLogin = await this.authService.login(loginDto);
    Cookie.setCookie({
      res,
      name: 'token',
      data: dataLogin.token,
    });

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Login successful',
      data: dataLogin,
    });
  }
}
