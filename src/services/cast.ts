import { Injectable } from '@nestjs/common';
import { CastRepository } from 'src/repositories';

@Injectable()
export class CastService {
  constructor(private readonly castRepository: CastRepository) {}
}
