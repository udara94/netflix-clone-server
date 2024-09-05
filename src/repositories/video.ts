import { Video } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class VideoRepository extends BaseRepository<Video> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Video, Video[]>,
  ) {
    super(knex, 'videos');
  }

  async getVideoByGenreId(genreId: number): Promise<Video[]> {
    try {
      const result = await this.queryBuilder()
        .select('*')
        .from('videos as v')
        .join('video_genre  as vg', 'v.id', 'vg.video_id')
        .where('vg.genre_id', genreId)
        .limit(10);

      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }
}
