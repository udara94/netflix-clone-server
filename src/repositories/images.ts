import { VideoImages } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

export class ImagesRepository extends BaseRepository<VideoImages> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<VideoImages, VideoImages[]>,
  ) {
    super(knex, 'image_sets');
  }
}
