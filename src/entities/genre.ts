import { IsNotEmpty } from 'class-validator';

export class Genre {
  id: number;
  name: string;
}

export class GenreResponse {
  id: number;
  name: string;

  constructor(genre: Genre) {
    this.id = genre.id;
    this.name = genre.name;
  }

  static fromEntity(genre: Genre): GenreResponse {
    return new GenreResponse(genre);
  }
}

export class CreateGenreDTO {
  @IsNotEmpty()
  name: string;

  static toEntity(dto: CreateGenreDTO): Genre {
    const genre = new Genre();
    genre.name = dto.name;
    return genre;
  }
}
