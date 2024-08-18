import { User } from 'src/entities';
import { BaseRepository } from './base';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { QueryFailedError } from 'src/errors';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectKnex()
    readonly knex: Knex<User, User[]>,
  ) {
    super(knex, 'users');
  }

  async createUser(data: User): Promise<User> {
    try {
      const [result] = await this.queryBuilder()
        .insert(data)
        .returning(['id', 'first_name', 'last_name', 'email', 'mobile']);
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      return await this.queryBuilder()
        .select('id', 'first_name', 'last_name', 'email', 'mobile')
        .where({ id: userId })
        .first('id', 'first_name', 'last_name', 'email', 'mobile');
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }
}
