import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('image_sets', function (table) {
    table.bigInteger('show_id').references('id').inTable('videos');
    table.string('vertical_poster_w240');
    table.string('vertical_poster_w360');
    table.string('vertical_poster_w480');
    table.string('vertical_poster_w600');
    table.string('vertical_poster_w720');
    table.string('horizontal_poster_w360');
    table.string('horizontal_poster_w480');
    table.string('horizontal_poster_w720');
    table.string('horizontal_poster_w1080');
    table.string('horizontal_poster_w1440');
    table.string('horizontal_backdrop_w360');
    table.string('horizontal_backdrop_w480');
    table.string('horizontal_backdrop_w720');
    table.string('horizontal_backdrop_w1080');
    table.string('horizontal_backdrop_w1440');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('image_sets');
}
