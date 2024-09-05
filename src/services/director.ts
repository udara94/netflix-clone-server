import { Injectable } from '@nestjs/common';
import { Director } from 'src/entities';
import { DirectorRepository } from 'src/repositories';

@Injectable()
export class DirectorService {
  constructor(private readonly directorRepository: DirectorRepository) {}

  async getDirectorsByVideoId(videoId: string | number): Promise<Director[]> {
    const data = await this.directorRepository.getDirectorsByVideoId(videoId);
    return data;
  }
}
