import { Cast } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

export class CastRepository extends BaseRepository<Cast> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Cast, Cast[]>,
  ) {
    super(knex, 'casts');
  }
}
