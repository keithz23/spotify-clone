import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Request,
  Response,
  UploadedFile,
} from '@nestjs/common';
import { SongDto } from './dto/song.dto';
import { SongService } from './song.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  @Post('/add-song')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('files'))
  //   getSong(@Request() req, @Response() res) {
  //     const files = req.files.audio[0];
  //     console.log(files);
  //     // return this.songService.addSong(songDto);
  //     return 'Success';
  //   }
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return file
  }
}
