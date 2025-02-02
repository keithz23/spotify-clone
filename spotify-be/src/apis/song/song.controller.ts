import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { SongDto } from './dto/song.dto';
import { SongService } from './song.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';
import { S3Utils } from 'src/utils/s3.util';
import { plainToClass } from 'class-transformer';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('/add-song')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'songImageFile', maxCount: 1 },
        { name: 'songAudio', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  async addSong(
    @Body() songDto: SongDto,
    @UploadedFiles()
    files: {
      songImageFile: Express.Multer.File[];
      songAudio: Express.Multer.File[];
    },
  ) {
    if (!files || !files.songImageFile || !files.songAudio) {
      throw new BadRequestException(
        'Both songImage and songAudio files are required',
      );
    }
    const songImage = files.songImageFile[0];
    const songAudio = files.songAudio[0];

    const upload = await S3Utils.uploadToS3({
      songImage: songImage,
      songAudio: songAudio,
    });

    songDto.songImageFile = upload.songImage;
    songDto.songAudio = upload.songAudio;
    songDto.songDuration = upload.durationFormatted;

    if (typeof songDto.songCredit === 'string') {
      songDto.songCredit = JSON.parse(songDto.songCredit);
    }

    const transformedSongDto = plainToClass(SongDto, songDto);

    return this.songService.addSong(transformedSongDto);
  }

  @Get('/get-songs')
  async getAllSong() {
    return this.songService.getAllSong();
  }
}
