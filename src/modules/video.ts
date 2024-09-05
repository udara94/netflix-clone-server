import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoController } from 'src/controllers';
import {
  CastRepository,
  DirectorRepository,
  GenreRepository,
  ImagesRepository,
  VideoRepository,
} from 'src/repositories';
import {
  CastService,
  DirectorService,
  GenreService,
  ImagesService,
  VideoService,
} from 'src/services';

@Module({
  imports: [ConfigModule],
  controllers: [VideoController],
  providers: [
    VideoService,
    VideoRepository,
    GenreService,
    GenreRepository,
    CastService,
    CastRepository,
    DirectorService,
    DirectorRepository,
    ImagesService,
    ImagesRepository,
  ],
  exports: [VideoService],
})
export class VideoModule {}
