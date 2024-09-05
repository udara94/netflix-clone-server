import { Cast } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class CastRepository extends BaseRepository<Cast> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Cast, Cast[]>,
  ) {
    super(knex, 'casts');
  }

  async getCastByVideoId(videoId: number | string): Promise<Cast[]> {
    try {
      const result = await this.queryBuilder()
        .select('c.id', 'c.name')
        .from('casts as c')
        .join('video_cast as vc', 'c.id', 'vc.cast_id')
        .where('vc.video_id', videoId);
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }
}
