import { Injectable } from '@nestjs/common';
import { DirectorRepository } from 'src/repositories';

@Injectable()
export class DirectorService {
  constructor(private readonly directorRepository: DirectorRepository) {}
}
