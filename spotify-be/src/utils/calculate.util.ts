import { extname } from 'path';

export class CalculateUtils {
  public static calculateMp3Duration(buffer: Buffer): number {
    try {
      let offset = 0;
      while (offset < buffer.length - 4) {
        if (buffer[offset] === 0xff && (buffer[offset + 1] & 0xe0) === 0xe0) {
          break;
        }
        offset++;
      }

      if (offset >= buffer.length - 4) {
        throw new Error('Invalid MP3 file');
      }

      const bitrateIndex = (buffer[offset + 2] >> 4) & 0x0f;
      const bitrates = [
        0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
      ];
      const bitrate = bitrates[bitrateIndex] * 1000; // Convert to bps

      if (bitrate === 0) {
        throw new Error('Invalid bitrate');
      }

      const duration = (buffer.length * 8) / bitrate;
      return Math.round(duration);
    } catch (error) {
      console.error('Duration calculation error:', error);
      return 0;
    }
  }

  public static calculateWavDuration(buffer: Buffer): number {
    try {
      // WAV header format
      const sampleRate = buffer.readUInt32LE(24);
      const totalSamples = buffer.readUInt32LE(40) / 2; // Divide by 2 for stereo
      const duration = totalSamples / sampleRate;
      return Math.round(duration);
    } catch (error) {
      console.error('WAV duration calculation error:', error);
      return 0;
    }
  }

  public static getAudioDuration(file: Express.Multer.File): number {
    const extension = extname(file.originalname).toLowerCase();

    switch (extension) {
      case '.mp3':
        return this.calculateMp3Duration(file.buffer);
      case '.wav':
        return this.calculateWavDuration(file.buffer);
      default:
        console.warn(
          `Unsupported file type for duration calculation: ${extension}`,
        );
        return 0;
    }
  }
}
