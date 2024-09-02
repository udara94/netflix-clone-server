import { Knex } from 'knex';
import { Video, VideoImages } from '../../entities';

import actionMovies from '../seed-data/actionMovies.json';
import adventureMovies from '../seed-data/adventureMovies.json';
import animationMovies from '../seed-data/animationMovies.json';
import comedyMovies from '../seed-data/comedyMovies.json';
import crimeMovies from '../seed-data/crimeMovies.json';
import documentaryMovies from '../seed-data/documentryMovies.json';
import drama from '../seed-data/drama.json';
import familyMovies from '../seed-data/familyMovies.json';
import fantacyMovies from '../seed-data/fantacyMovies.json';
import historyMovies from '../seed-data/historyMovies.json';
import horrorMovies from '../seed-data/horroMovies.json';
import musicMovies from '../seed-data/musicMovies.json';
import mysteryMovies from '../seed-data/mysteryMovies.json';
import newsMovies from '../seed-data/newsMovies.json';
import realityMovies from '../seed-data/realityMovies.json';
import romanceMovies from '../seed-data/romanceMovies.json';
import scifiMovies from '../seed-data/scifiMovies.json';
import talkMovies from '../seed-data/taklMovies.json';
import thrillerMovies from '../seed-data/thrillerMovies.json';
import warMovies from '../seed-data/warMovies.json';
import westernMovies from '../seed-data/western.json';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('video_genre').del();
  await knex('video_cast').del();
  await knex('video_director').del();
  await knex('image_sets').del();
  await knex('genres').del();
  await knex('casts').del();
  await knex('directors').del();
  await knex('videos').del();

  await runSeedOn(knex, actionMovies);
  await runSeedOn(knex, adventureMovies);
  await runSeedOn(knex, animationMovies);
  await runSeedOn(knex, comedyMovies);
  await runSeedOn(knex, crimeMovies);
  await runSeedOn(knex, documentaryMovies);
  await runSeedOn(knex, drama);
  await runSeedOn(knex, familyMovies);
  await runSeedOn(knex, fantacyMovies);
  await runSeedOn(knex, historyMovies);
  await runSeedOn(knex, horrorMovies);
  await runSeedOn(knex, musicMovies);
  await runSeedOn(knex, mysteryMovies);
  await runSeedOn(knex, newsMovies);
  await runSeedOn(knex, realityMovies);
  await runSeedOn(knex, romanceMovies);
  await runSeedOn(knex, scifiMovies);
  await runSeedOn(knex, talkMovies);
  await runSeedOn(knex, thrillerMovies);
  await runSeedOn(knex, warMovies);
  await runSeedOn(knex, westernMovies);

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

async function runSeedOn(knex: Knex, movies: any) {
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

    let imageSet = new VideoImages();
    imageSet.show_id = videoData[0].id;
    if (item.imageSet != null && item.imageSet?.verticalPoster != null) {
      imageSet.vertical_poster_w240 = item.imageSet?.verticalPoster?.w240;
      imageSet.vertical_poster_w360 = item.imageSet?.verticalPoster?.w360;
      imageSet.vertical_poster_w480 = item.imageSet?.verticalPoster?.w480;
      imageSet.vertical_poster_w600 = item.imageSet?.verticalPoster?.w600;
      imageSet.vertical_poster_w720 = item.imageSet?.verticalPoster?.w720;
    }

    if (item.imageSet != null && item.imageSet?.horizontalPoster != null) {
      imageSet.horizontal_poster_w360 = item.imageSet?.horizontalPoster?.w360;
      imageSet.horizontal_poster_w480 = item.imageSet?.horizontalPoster?.w480;
      imageSet.horizontal_poster_w720 = item.imageSet?.horizontalPoster?.w720;
      imageSet.horizontal_poster_w1080 = item.imageSet?.horizontalPoster?.w1080;
      imageSet.horizontal_poster_w1440 = item.imageSet?.horizontalPoster?.w1440;
    }

    if (item.imageSet != null && item.imageSet?.horizontalBackdrop != null) {
      imageSet.horizontal_backdrop_w360 =
        item.imageSet?.horizontalBackdrop?.w360;
      imageSet.horizontal_backdrop_w480 =
        item.imageSet?.horizontalBackdrop?.w480;
      imageSet.horizontal_backdrop_w720 =
        item.imageSet?.horizontalBackdrop?.w720;
      imageSet.horizontal_poster_w1080 =
        item.imageSet?.horizontalBackdrop?.w1080;
      imageSet.horizontal_backdrop_w1440 =
        item.imageSet?.horizontalBackdrop?.w1440;
    }

    await knex<VideoImages>('image_sets').insert(imageSet).returning('*');
  }
}
