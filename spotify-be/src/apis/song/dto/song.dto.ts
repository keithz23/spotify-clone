import {ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SongCredit {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songPerformed: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songWritten: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songProduced: string;

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
  
  songImage: string;

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
  @ValidateNested()
  @Type(() => SongCredit)
  songCredit: SongCredit;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  songDuration: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  songImageWidth: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  songImageHeight: number;
}

export class CreateSongDto extends SongDto {}
