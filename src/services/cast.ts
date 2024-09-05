import { Injectable } from '@nestjs/common';
import { Cast } from 'src/entities';
import { CastRepository } from 'src/repositories';

@Injectable()
export class CastService {
  constructor(private readonly castRepository: CastRepository) {}

  async getCastsByVideoId(videoId: string | number): Promise<Cast[]> {
    const data = await this.castRepository.getCastByVideoId(videoId);
    return data;
  }
}
