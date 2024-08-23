import { Injectable } from '@nestjs/common';
import { CreateProfileDTO, Profile, ProfileResponse } from 'src/entities';
import { ProfileRepository } from 'src/repositories';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfilesByUserId(userId: number): Promise<ProfileResponse[]> {
    const profiles = await this.profileRepository.findMany({
      where: { user_id: userId },
    });
    const response = profiles.data.map((profile) => {
      return ProfileResponse.fromEntity(profile);
    });
    return response;
  }

  async createProfile(profileDTO: CreateProfileDTO): Promise<ProfileResponse> {
    const profile = CreateProfileDTO.toEntity(profileDTO);
    const result = await this.profileRepository.insert(profile);
    return ProfileResponse.fromEntity(result);
  }
}
