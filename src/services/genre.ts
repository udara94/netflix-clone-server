import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'src/repositories';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}
}
