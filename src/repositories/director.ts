import { Director } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

export class DirectorRepository extends BaseRepository<Director> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Director, Director[]>,
  ) {
    super(knex, 'directors');
  }
}
