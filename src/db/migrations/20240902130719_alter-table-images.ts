import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('image_sets', function (table) {
    table.text('vertical_poster_w240').alter();
    table.text('vertical_poster_w360').alter();
    table.text('vertical_poster_w480').alter();
    table.text('vertical_poster_w600').alter();
    table.text('vertical_poster_w720').alter();
    table.text('horizontal_poster_w360').alter();
    table.text('horizontal_poster_w480').alter();
    table.text('horizontal_poster_w720').alter();
    table.text('horizontal_poster_w1080').alter();
    table.text('horizontal_poster_w1440').alter();
    table.text('horizontal_backdrop_w360').alter();
    table.text('horizontal_backdrop_w480').alter();
    table.text('horizontal_backdrop_w720').alter();
    table.text('horizontal_backdrop_w1080').alter();
    table.text('horizontal_backdrop_w1440').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('image_sets', function (table) {
    table.string('vertical_poster_w240').alter();
    table.string('vertical_poster_w360').alter();
    table.string('vertical_poster_w480').alter();
    table.string('vertical_poster_w600').alter();
    table.string('vertical_poster_w720').alter();
    table.string('horizontal_poster_w360').alter();
    table.string('horizontal_poster_w480').alter();
    table.string('horizontal_poster_w720').alter();
    table.string('horizontal_poster_w1080').alter();
    table.string('horizontal_poster_w1440').alter();
    table.string('horizontal_backdrop_w360').alter();
    table.string('horizontal_backdrop_w480').alter();
    table.string('horizontal_backdrop_w720').alter();
    table.string('horizontal_backdrop_w1080').alter();
    table.string('horizontal_backdrop_w1440').alter();
  });
}
