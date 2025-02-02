import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class SongCredit {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songPerformed: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songProduced: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songWritten: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songSource: string;
}

export class SongDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songDesc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songGenre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songAlbum: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  songReleaseDate: string;

  @ApiProperty({ type: SongCredit })
  @IsNotEmpty()
  @Type(() => SongCredit)
  songCredit: SongCredit;

  @ApiProperty({ type: 'string', format: 'binary' })
  songImageFile: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  songAudio: any;

  // @ApiProperty()
  // songImageFile: string;

  // @ApiProperty()
  // songAudio: string;

  @ApiProperty()
  @IsNotEmpty()
  songImageHeight: number;

  @ApiProperty()
  @IsNotEmpty()
  songImageWidth: number;

  songDuration: string;
}
