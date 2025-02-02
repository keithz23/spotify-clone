import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SongDto } from './dto/song.dto';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<SongDocument>,
  ) {}

  async addSong(payload: SongDto): Promise<Song> {
    const {
      songTitle,
      songDesc,
      songGenre,
      songAlbum,
      songReleaseDate,
      songAudio,
      songImageFile,
      songImageHeight,
      songImageWidth,
      songDuration,
      songCredit: { songPerformed, songWritten, songProduced, songSource },
    } = payload;

    const songData = new this.songModel({
      songTitle,
      songDesc,
      songGenre,
      songAlbum,
      songReleaseDate,
      songAudio,
      songCredit: { songPerformed, songWritten, songProduced, songSource },
      songImageFile,
      songImageHeight,
      songImageWidth,
      songDuration,
    });

    console.log(songData);
    await songData.save();

    return songData;
  }

  async getAllSong(): Promise<Song[]> {
    return this.songModel.find().exec();
  }
}
