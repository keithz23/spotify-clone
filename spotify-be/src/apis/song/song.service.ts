import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/song.schema';
import { Model } from 'mongoose';
import { SongDto } from './dto/song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
  ) {}

  async addSong(payload: SongDto) {
    const {
      songTitle,
      songImage,
      songDesc,
      songGenre,
      songAlbum,
      songReleaseDate,
      songCredit: { songWritten, songPerformed, songSource, songProduced },
      songDuration,
      songImageHeight,
      songImageWidth,
    } = payload;

    let songData = new this.songModel({
      songTitle,
      songImage,
      songDesc,
      songGenre,
      songAlbum,
      songReleaseDate,
      songCredit: { songWritten, songPerformed, songSource, songProduced },
      songDuration,
      songImageHeight,
      songImageWidth,
    });

    await songData.save();

    return songData;
  }
}
