import { Injectable } from '@nestjs/common';
import { ImagesRepository } from 'src/repositories';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}
}
