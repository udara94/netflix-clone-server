import { Genre, GenreResponse } from './genre';

export class Video {
  id: number | string;
  imdb_id: string;
  tmdb_id: string;
  title: string;
  overview: string;
  release_year: string | number;
  original_title: string;
  rating: number;
  run_time: number;
  item_type: string;
  show_type: string;
}

export class VideoResponse {
  id: number | string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear: string | number;
  originalTitle: string;
  rating: number;
  runTime: number;
  itemType: string;
  showType: string;
  genres: GenreResponse[];

  constructor(video: Video) {
    this.id = video.id;
    this.imdbId = video.imdb_id;
    this.tmdbId = video.tmdb_id;
    this.itemType = video.item_type;
    this.originalTitle = video.original_title;
    this.overview = video.overview;
    this.rating = video.rating;
    this.releaseYear = video.release_year;
    this.runTime = video.run_time;
    this.showType = video.show_type;
    this.title = video.title;
  }

  static fromEntity(video: Video): VideoResponse {
    return new VideoResponse(video);
  }
}

export class CreateVideoDTO {
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear: string | number;
  originalTitle: string;
  rating: number;
  runTime: number;
  itemType: string;
  showType: string;

  static toEntity(dto: CreateVideoDTO): Video {
    const video = new Video();
    video.imdb_id = dto.imdbId;
    video.item_type = dto.itemType;
    video.original_title = dto.originalTitle;
    video.overview = dto.overview;
    video.rating = dto.rating;
    video.release_year = dto.releaseYear;
    video.run_time = dto.runTime;
    video.show_type = dto.showType;
    video.title = dto.title;
    video.tmdb_id = dto.tmdbId;
    return video;
  }
}

export class HomeVideoResponse {}
