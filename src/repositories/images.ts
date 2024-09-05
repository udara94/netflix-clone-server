import { VideoImages } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class ImagesRepository extends BaseRepository<VideoImages> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<VideoImages, VideoImages[]>,
  ) {
    super(knex, 'image_sets');
  }

  // async getImageSetByVideoId(videoId: number|string): Promise<VideoImages>{
  //   try {
  //     const result = await this.queryBuilder()
  //     .select('')
  //     from()
  //   } catch (error) {
  //     throw new QueryFailedError(error)
  //   }
  // }
}
