import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository, VideoRepository } from 'src/repositories';
import { GenreService } from './genre';
import { CastService } from './cast';
import { DirectorService } from './director';
import { ImagesService } from './images';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly genreService: GenreService,
    private readonly castService: CastService,
    private readonly directorService: DirectorService,
    private readonly imageService: ImagesService,
  ) {}

  async getHomeData() {
    //get all genres
    const allGenres = await this.genreService.getAllGenres();

    if (!allGenres) {
      return null;
    }

    const videoPromise = allGenres.map(async (genre) => {
      // get the 1st 10 videos for each genre
      const videos = await this.videoRepository.getVideoByGenreId(genre.id);

      const videoGenrePromises = await videos.map(async (video) => {
        //find all genres related to that movie
        const genres = await this.genreService.getGenresByVideoId(video.id);

        //find all cast related to that movie
        const casts = await this.castService.getCastsByVideoId(video.id);

        //find all directors related to that movie
        const directors = await this.directorService.getDirectorsByVideoId(
          video.id,
        );

        //find all images related to that movie
        const images = await this.imageService.getImageSetByVideoId(video.id);

        return {
          ...video,
          genres: genres,
          casts: casts,
          directors: directors,
          imageSet: images,
        };
      });

      const videoRes = await Promise.all(videoGenrePromises);
      return { ...genre, videos: videoRes };
    });

    const data = await Promise.all(videoPromise);
    return data;
  }
}
