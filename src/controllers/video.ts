import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards';
import { VideoService } from 'src/services';

@UseGuards(UserGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('home')
  async getHomeData() {
    return this.videoService.getHomeData();
  }
}
