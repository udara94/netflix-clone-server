import { ImageSet } from 'src/types/interfaces';

export class VideoImages {
  show_id: number | string;
  vertical_poster_w240: string;
  vertical_poster_w360: string;
  vertical_poster_w480: string;
  vertical_poster_w600: string;
  vertical_poster_w720: string;
  horizontal_poster_w360: string;
  horizontal_poster_w480: string;
  horizontal_poster_w720: string;
  horizontal_poster_w1080: string;
  horizontal_poster_w1440: string;
  horizontal_backdrop_w360: string;
  horizontal_backdrop_w480: string;
  horizontal_backdrop_w720: string;
  horizontal_backdrop_w1080: string;
  horizontal_backdrop_w1440: string;
}

export class VideoImagesResponse {
  showId: number | string;
  verticalPosterW240: string;
  verticalPosterW360: string;
  verticalPosterW480: string;
  verticalPosterW600: string;
  verticalPosterW720: string;
  horizontalPosterW360: string;
  horizontalPosterW480: string;
  horizontalPosterW720: string;
  horizontalPosterW1080: string;
  horizontalPosterW1440: string;
  horizontalBackdropW360: string;
  horizontalBackdropW480: string;
  horizontalBackdropW720: string;
  horizontalBackdropW1080: string;
  horizontalBackdropW1440: string;

  constructor(videoImage: VideoImages) {
    this.showId = videoImage.show_id;
    this.verticalPosterW240 = videoImage.vertical_poster_w240;
    this.verticalPosterW360 = videoImage.vertical_poster_w360;
    this.verticalPosterW480 = videoImage.vertical_poster_w480;
    this.verticalPosterW600 = videoImage.vertical_poster_w600;
    this.verticalPosterW720 = videoImage.vertical_poster_w720;
    this.horizontalPosterW360 = videoImage.horizontal_poster_w360;
    this.horizontalPosterW480 = videoImage.horizontal_poster_w480;
    this.horizontalPosterW720 = videoImage.horizontal_poster_w720;
    this.horizontalPosterW1080 = videoImage.horizontal_poster_w1080;
    this.horizontalPosterW1440 = videoImage.horizontal_poster_w1440;
    this.horizontalBackdropW360 = videoImage.horizontal_backdrop_w360;
    this.horizontalBackdropW480 = videoImage.horizontal_backdrop_w480;
    this.horizontalBackdropW720 = videoImage.horizontal_backdrop_w720;
    this.horizontalBackdropW1080 = videoImage.horizontal_backdrop_w1080;
    this.horizontalBackdropW1440 = videoImage.horizontal_backdrop_w1440;
  }

  static fromEntity(image: VideoImages): VideoImagesResponse {
    return new VideoImagesResponse(image);
  }

  getImageSet(): ImageSet {
    const imageSetResponse: ImageSet = {
      verticalPoster: {
        w240: this.verticalPosterW240,
        w360: this.verticalPosterW360,
        w480: this.verticalPosterW480,
        w600: this.verticalPosterW600,
        w720: this.verticalPosterW720,
      },
      horizontalPoster: {
        w360: this.horizontalPosterW360,
        w480: this.horizontalPosterW480,
        w720: this.horizontalPosterW720,
        w1080: this.horizontalPosterW1080,
        w1440: this.horizontalPosterW1440,
      },
      horizontalBackdrop: {
        w360: this.horizontalBackdropW360,
        w480: this.horizontalBackdropW480,
        w720: this.horizontalBackdropW720,
        w1080: this.horizontalBackdropW1080,
        w1440: this.horizontalBackdropW1440,
      },
    };
    return imageSetResponse;
  }
}

export class CreateVideoImageDTO {
  showId: number | string;
  verticalPosterW240: string;
  verticalPosterW360: string;
  verticalPosterW480: string;
  verticalPosterW600: string;
  verticalPosterW720: string;
  horizontalPosterW360: string;
  horizontalPosterW480: string;
  horizontalPosterW720: string;
  horizontalPosterW1080: string;
  horizontalPosterW1440: string;
  horizontalBackdropW360: string;
  horizontalBackdropW480: string;
  horizontalBackdropW720: string;
  horizontalBackdropW1080: string;
  horizontalBackdropW1440: string;

  static toEntity(dto: CreateVideoImageDTO): VideoImages {
    const videoImage = new VideoImages();
    videoImage.show_id = dto.showId;
    videoImage.vertical_poster_w240 = dto.verticalPosterW240;
    videoImage.vertical_poster_w360 = dto.verticalPosterW360;
    videoImage.vertical_poster_w480 = dto.verticalPosterW480;
    videoImage.vertical_poster_w600 = dto.verticalPosterW600;
    videoImage.vertical_poster_w720 = dto.verticalPosterW720;
    videoImage.horizontal_poster_w360 = dto.horizontalPosterW360;
    videoImage.horizontal_poster_w480 = dto.horizontalPosterW480;
    videoImage.horizontal_poster_w720 = dto.horizontalPosterW720;
    videoImage.horizontal_poster_w1080 = dto.horizontalPosterW1080;
    videoImage.horizontal_poster_w1440 = dto.horizontalPosterW1440;
    videoImage.horizontal_backdrop_w360 = dto.horizontalBackdropW360;
    videoImage.horizontal_backdrop_w480 = dto.horizontalBackdropW480;
    videoImage.horizontal_backdrop_w720 = dto.horizontalBackdropW720;
    videoImage.horizontal_backdrop_w1080 = dto.horizontalBackdropW1080;
    videoImage.horizontal_backdrop_w1440 = dto.horizontalBackdropW1440;
    return videoImage;
  }
}
