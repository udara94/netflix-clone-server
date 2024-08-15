import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.bigIncrements('id').unsigned().primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('mobile');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
