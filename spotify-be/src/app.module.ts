import { Module } from '@nestjs/common';
import { AuthModule } from './apis/auth/auth.module';
import { DatabaseModule } from './configs/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SongModule } from './apis/song/song.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    AuthModule,
    SongModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
