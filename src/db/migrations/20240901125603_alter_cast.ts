import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('casts', function (table) {
    table.renameColumn('first_name', 'name');
    table.dropColumn('last_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('cast', function (table) {
    table.renameColumn('name', 'first_name');
    table.string('last_name');
  });
}
