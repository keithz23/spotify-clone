import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class SongCredit {
  @Prop({ required: true })
  songPerformed: string;

  @Prop({ required: true })
  songProduced: string;

  @Prop({ required: true })
  songWritten: string;

  @Prop({ required: true })
  songSource: string;
}

export const SongCreditSchema = SchemaFactory.createForClass(SongCredit);

@Schema()
export class Song {
  @Prop({ required: true })
  songTitle: string;

  @Prop({ required: true })
  songDesc: string;

  @Prop({ required: true })
  songGenre: string;

  @Prop({ required: true })
  songAlbum: string;

  @Prop({ required: true })
  songReleaseDate: string;

  @Prop({ required: true })
  songAudio: string;

  @Prop({
    required: true,
    type: Object,
  })
  songCredit: {
    songPerformed: string;
    songWritten: string;
    songProduced: string;
    songSource: string;
  };

  @Prop({ required: true })
  songImageFile: string;

  @Prop({ required: true })
  songImageHeight: number;

  @Prop({ required: true })
  songImageWidth: number;

  @Prop({ required: true })
  songDuration: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
