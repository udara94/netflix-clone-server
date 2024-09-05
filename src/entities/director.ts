import { IsNotEmpty } from 'class-validator';

export class Director {
  id: number;
  name: string;
}

export class DirectorResponse {
  id: number;
  name: string;

  constructor(director: Director) {
    this.id = director.id;
    this.name = director.name;
  }

  static fromEntity(director: Director): DirectorResponse {
    return new DirectorResponse(director);
  }
}

export class CreateDirectorDTO {
  @IsNotEmpty()
  name: string;

  static toEntity(dto: CreateDirectorDTO): Director {
    const director = new Director();
    director.name = dto.name;
    return director;
  }
}
