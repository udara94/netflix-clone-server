import { Knex } from 'knex';
import { genreList } from '../seed-data/genre';
import movies from '../seed-data/movie.json';
import { Video } from '../../entities';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('video_genre').del();
  await knex('genres').del();
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
  }

  await knex.raw(
    `SELECT setval('"genres_id_seq"', (SELECT MAX(id) FROM genres))`,
  );
  await knex.raw(
    `SELECT setval('"videos_id_seq"', (SELECT MAX(id) FROM videos))`,
  );
}
