import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('videos', function (table) {
    table.text('overview').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('videos', function (table) {
    table.string('overview', 255).alter();
  });
}
