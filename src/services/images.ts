import { Injectable } from '@nestjs/common';
import { VideoImagesResponse } from 'src/entities';
import { ImagesRepository } from 'src/repositories';
import { ImageSet } from 'src/types/interfaces';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async getImageSetByVideoId(videoId: string | number): Promise<ImageSet> {
    const data = await this.imagesRepository.findOne({ show_id: videoId });
    if (!data) {
      return null;
    }
    const videoImages = new VideoImagesResponse(data);
    return videoImages.getImageSet();
  }
}
