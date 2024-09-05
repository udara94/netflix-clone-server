import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoController } from 'src/controllers';
import { GenreRepository, VideoRepository } from 'src/repositories';
import { VideoService } from 'src/services';

@Module({
  imports: [ConfigModule],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository, GenreRepository],
  exports: [VideoService],
})
export class VideoModule {}
