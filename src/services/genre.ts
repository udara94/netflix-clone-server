import { Injectable } from '@nestjs/common';
import { Genre } from 'src/entities';
import { GenreRepository } from 'src/repositories';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async getAllGenres(): Promise<Genre[]> {
    const data = await this.genreRepository.findMany({});
    return data.data;
  }

  async getGenresByVideoId(videoId: string | number): Promise<Genre[]> {
    const data = await this.genreRepository.getGenreByVideoId(videoId);
    return data;
  }
}
