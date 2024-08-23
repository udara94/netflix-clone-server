import { IsNotEmpty } from 'class-validator';

export class Profile {
  id: number;
  user_id: number;
  profile_name: string;
}

export class ProfileResponse {
  id: number;
  userId: number;
  profileName: string;

  constructor(profile: Profile) {
    this.id = profile.id;
    this.userId = profile.user_id;
    this.profileName = profile.profile_name;
  }

  static fromEntity(profile: Profile): ProfileResponse {
    return new ProfileResponse(profile);
  }
}

export class CreateProfileDTO {
  @IsNotEmpty()
  profileName: string;

  @IsNotEmpty()
  userId: number;

  static toEntity(dto: CreateProfileDTO): Profile {
    const profile = new Profile();
    profile.profile_name = dto.profileName;
    profile.user_id = dto.userId;
    return profile;
  }
}
