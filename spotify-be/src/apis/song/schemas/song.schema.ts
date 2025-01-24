import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Song extends Document {
  @Prop({ required: true })
  songTitle: string;
  @Prop({ required: true })
  songImage: string;
  @Prop({ required: true })
  songFile: string;
  @Prop({ required: true })
  songDesc: string;
  @Prop({ required: true })
  songGenre: string;
  @Prop({ required: true })
  songAlbum: string;
  @Prop({ required: true })
  songReleaseDate: string;
  @Prop({ required: true, type: Object })
  songCredit: {
    songPerformed: string;
    songWritten: string;
    songProduced: string;
    songSource: string;
  };
  @Prop({ required: true })
  songDuration: number;
  @Prop({ required: true })
  songImageWidth: number;
  @Prop({ required: true })
  songImageHeight: number;
  @Prop({ default: Date })
  createdAt?: Date;
  @Prop({ default: Date })
  updatedAt?: Date;
  @Prop({ default: null })
  deletedAt?: Date;
  @Prop({ default: null })
  createdBy?: string;
  @Prop({ default: null })
  updatedBy?: string;
  @Prop({ default: null })
  deletedBy?: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
