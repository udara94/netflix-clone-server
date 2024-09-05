import { Genre } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class GenreRepository extends BaseRepository<Genre> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Genre, Genre[]>,
  ) {
    super(knex, 'genres');
  }

  async getGenreByVideoId(videoId: number | string): Promise<Genre[]> {
    try {
      const result = await this.queryBuilder()
        .select('g.id', 'g.name')
        .from('genres as g')
        .join('video_genre as vg', 'g.id', 'vg.genre_id')
        .where('vg.video_id', videoId);
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }
}
