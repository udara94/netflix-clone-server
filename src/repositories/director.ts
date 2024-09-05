import { Director } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class DirectorRepository extends BaseRepository<Director> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Director, Director[]>,
  ) {
    super(knex, 'directors');
  }

  async getDirectorsByVideoId(videoId: string | number): Promise<Director[]> {
    try {
      const result = await this.queryBuilder()
        .select('d.id', 'd.name')
        .from('directors as d')
        .join('video_director as vd', 'd.id', 'vd.director_id')
        .where('vd.video_id', videoId);
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }
}
