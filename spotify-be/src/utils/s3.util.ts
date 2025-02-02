import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { CalculateUtils } from './calculate.util';

// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export class S3Utils {
  static async uploadToS3(files: {
    songImage: Express.Multer.File;
    songAudio: Express.Multer.File;
  }) {
    if (!files || !files.songImage || !files.songAudio) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const uploadFile = async (file: Express.Multer.File) => {
      const uniqueFileName = `uploads/${uuid()}${extname(file.originalname)}`;

      try {
        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: uniqueFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
          },
          partSize: 20 * 1024 * 1024, // 20MB parts
          queueSize: 4, // Concurrent uploads
        });

        const result = await upload.done();
        return {
          url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`,
          key: uniqueFileName,
          ...result,
        };
      } catch (error) {
        console.error('S3 Upload Error:', error);
        throw new HttpException(
          'File upload failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    };

    const duration = CalculateUtils.getAudioDuration(files.songAudio);

    // Upload files
    const songImageUpload = await uploadFile(files.songImage);
    const songAudioUpload = await uploadFile(files.songAudio);
    console.log(`songDuration ${this.formatDuration(duration)}`);

    return {
      songImage: songImageUpload.url,
      songAudio: songAudioUpload.url,
      duration: duration,
      durationFormatted: this.formatDuration(duration),
    };
  }

  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
