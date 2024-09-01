import { Knex } from 'knex';
import { genreList } from '../seed-data/genre';
import movies from '../seed-data/movie.json';
import { Video } from '../../entities';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('video_genre').del();
  await knex('video_cast').del();
  await knex('video_director');
  await knex('genres').del();
  await knex('casts').del();
  await knex('directors').del();
  await knex('videos').del();

  // await knex('genres').insert(genreList);

  for (const item of movies.shows) {
    const existingMovie = await knex<Video>('videos')
      .where({ tmdb_id: item.tmdbId })
      .orWhere({ imdb_id: item.imdbId })
      .first();

    if (existingMovie) {
      continue;
    }

    const video = new Video();
    video.id = item.id;
    video.imdb_id = item.imdbId;
    video.item_type = item.itemType;
    video.original_title = item.originalTitle;
    video.overview = item.overview;
    video.rating = item.rating;
    video.release_year = item.releaseYear;
    video.run_time = item.runtime;
    video.show_type = item.showType;
    video.title = item.title;
    video.tmdb_id = item.tmdbId;

    const videoData = await knex<Video>('videos').insert(video).returning('*');

    for (const genre of item.genres) {
      const existingGenre = await knex('genres')
        .where({ name: genre.name })
        .first();

      let genreItem = existingGenre;

      if (!existingGenre) {
        const newGenre = await knex('genres')
          .insert({ name: genre.name })
          .returning('*');
        genreItem = newGenre[0];
      }

      const existingVideoGenre = await knex('video_genre')
        .where({
          video_id: videoData[0].id,
          genre_id: genreItem.id,
        })
        .first();

      if (!existingVideoGenre) {
        const videoGenre = await knex('video_genre')
          .insert({ video_id: videoData[0].id, genre_id: genreItem.id })
          .returning('*');
      }
    }

    for (const name of item.cast) {
      const existingCast = await knex('casts').where({ name: name }).first();

      let castItem = existingCast;

      if (!existingCast) {
        const newCast = await knex('casts')
          .insert({ name: name })
          .returning('*');
        castItem = newCast[0];
      }

      const existingVideoCast = await knex('video_cast')
        .where({
          video_id: videoData[0].id,
          cast_id: castItem.id,
        })
        .first();

      if (!existingVideoCast) {
        const videoCast = await knex('video_cast').insert({
          video_id: videoData[0].id,
          cast_id: castItem.id,
        });
      }
    }

    for (const director of item.directors) {
      const existingDirector = await knex('directors')
        .where({ name: director })
        .first();

      let directorItem = existingDirector;

      if (!existingDirector) {
        const newDirector = await knex('directors')
          .insert({ name: director })
          .returning('*');
        directorItem = newDirector[0];
      }

      const existingVideoDirector = await knex('video_director')
        .where({
          video_id: videoData[0].id,
          director_id: directorItem.id,
        })
        .first();

      if (!existingVideoDirector) {
        const videoDirector = await knex('video_director').insert({
          video_id: videoData[0].id,
          director_id: directorItem.id,
        });
      }
    }
  }

  await knex.raw(
    `SELECT setval('"genres_id_seq"', (SELECT MAX(id) FROM genres))`,
  );

  await knex.raw(
    `SELECT setval('"casts_id_seq"', (SELECT MAX(id) FROM casts))`,
  );

  await knex.raw(
    `SELECT setval('"directors_id_seq"', (SELECT MAX(id) FROM directors))`,
  );

  await knex.raw(
    `SELECT setval('"videos_id_seq"', (SELECT MAX(id) FROM videos))`,
  );
}
