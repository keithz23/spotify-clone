import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmPasswd: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({default: 'read'})
  permission: string[];

  @Prop({ default: null })
  resetPasswordOtp?: string;

  @Prop({ default: null })
  resetPasswordExpired?: Date;

  @Prop({ default: Date })
  createdAt?: Date;

  @Prop({ default: Date })
  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ defaut: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;

  @Prop({ default: Date })
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
