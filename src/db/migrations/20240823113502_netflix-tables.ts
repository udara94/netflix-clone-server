import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists('profiles', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.bigInteger('user_id').references('id').inTable('users');
      table.string('profile_name');
    })
    .createTableIfNotExists('video_types', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.string('name');
    })
    .createTableIfNotExists('videos', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.bigInteger('video_type_id').references('id').inTable('video_types');
      table.string('description');
      table.string('release_year');
      table.float('rating');
      table.float('run_time');
    })
    .createTableIfNotExists('genres', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.string('name');
    })
    .createTableIfNotExists('directors', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.string('name');
    })
    .createTableIfNotExists('casts', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.string('first_name');
      table.string('last_name');
    })
    .createTableIfNotExists('video_genre', function (table) {
      table.bigInteger('video_id').references('id').inTable('videos');
      table.bigInteger('genre_id').references('id').inTable('genres');
    })
    .createTableIfNotExists('video_director', function (table) {
      table.bigInteger('video_id').references('id').inTable('videos');
      table.bigInteger('director_id').references('id').inTable('directors');
    })
    .createTableIfNotExists('video_cast', function (table) {
      table.bigInteger('video_id').references('id').inTable('videos');
      table.bigInteger('cast_id').references('id').inTable('casts');
    })
    .createTableIfNotExists('watch_lists', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.bigInteger('profile_id').references('id').inTable('profiles');
      table.bigInteger('video_id').references('id').inTable('videos');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('profiles')
    .dropTableIfExists('video_types')
    .dropTableIfExists('videos')
    .dropTableIfExists('genres')
    .dropTableIfExists('directors')
    .dropTableIfExists('casts')
    .dropTableIfExists('video_genre')
    .dropTableIfExists('video_director')
    .dropTableIfExists('video_cast')
    .dropTableIfExists('watch_lists');
}
