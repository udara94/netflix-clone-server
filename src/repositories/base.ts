import { Knex } from 'knex';
import { QueryFailedError } from '../errors';
export interface FindManyOptions<Entity> {
  where?: Partial<Entity>;
  sortBy?: keyof Entity;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  pageNumber?: number;
}
export abstract class BaseRepository<Entity> {
  knex: Knex;
  tableName: string;
  constructor(knex: Knex, tableName: string) {
    this.knex = knex;
    this.tableName = tableName;
  }
  async insert(data: Entity): Promise<Entity> {
    try {
      const [result] = await this.queryBuilder().insert(data).returning('*');
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  async update(where: Partial<Entity>, data: Partial<Entity>): Promise<Entity> {
    try {
      const [result] = await this.queryBuilder().where(where).update(data, '*');
      return result;
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  async findMany(options: FindManyOptions<Entity>) {
    try {
      const where = options.where || {};
      const sortBy = options.sortBy || null;
      const sortOrder = options.sortOrder || null;
      const pageSize = +options.pageSize;
      const pageNumber = +options.pageNumber;
      const offset = (pageNumber - 1) * pageSize;
      const dataQuery = this.queryBuilder<Entity, Entity[]>()
        .where(where)
        .select('*');
      if (sortBy && sortOrder) dataQuery.orderBy(sortBy, sortOrder);
      if (pageSize && pageNumber) {
        dataQuery.offset(offset).limit(pageSize);
      }
      const [data] = await Promise.all([dataQuery]);
      return { data };
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  async findOne(where: Partial<Entity>): Promise<Entity> {
    try {
      return await this.queryBuilder().where(where).first('*');
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  async delete(where: Partial<Entity>): Promise<void> {
    try {
      await this.queryBuilder().delete().where(where);
    } catch (error) {
      throw new QueryFailedError(error);
    }
  }

  queryBuilder<T, U>() {
    return this.knex<T, U>(this.tableName);
  }
}
