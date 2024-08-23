import { Profile } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

export class ProfileRepository extends BaseRepository<Profile> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<Profile, Profile[]>,
  ) {
    super(knex, 'profiles');
  }
}
