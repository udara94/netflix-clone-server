import { IsNotEmpty } from 'class-validator';

export class Cast {
  id: number;
  name: string;
}

export class CastResponse {
  id: number;
  name: string;

  constructor(cast: Cast) {
    this.id = cast.id;
    this.name = cast.name;
  }

  static fromEntity(cast: Cast): CastResponse {
    return new CastResponse(cast);
  }
}

export class CreateCastDTO {
  @IsNotEmpty()
  name: string;

  static toEntity(dto: CreateCastDTO): Cast {
    const cast = new Cast();
    cast.name = dto.name;
    return cast;
  }
}
