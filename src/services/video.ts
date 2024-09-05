import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository, VideoRepository } from 'src/repositories';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly genreRepository: GenreRepository,
  ) {}

  async getHomeData() {
    //get all genres
    const allGenres = await this.genreRepository.findMany({});

    if (!allGenres) {
      return null;
    }

    const videoPromise = allGenres.data.map(async (genre) => {
      // get the 1st 10 videos for each genre
      const videos = await this.videoRepository.getVideoByGenreId(genre.id);

      const videoGenrePromises = await videos.map(async (video) => {
        //find all genres related to that movie
        const genres = await this.genreRepository.getGenreByVideoId(video.id);
        return { ...video, genres: genres };
      });

      const videoRes = await Promise.all(videoGenrePromises);
      return { ...genre, videos: videoRes };
    });

    const data = await Promise.all(videoPromise);
    return data;
  }
}
