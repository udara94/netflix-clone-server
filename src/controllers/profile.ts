import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDTO } from 'src/entities';
import { UserGuard } from 'src/guards';
import { ProfileService } from 'src/services';

@UseGuards(UserGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('user/:id')
  async getProfiles(@Param('id') userId: number) {
    const data = await this.profileService.getProfilesByUserId(userId);
    return data;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createProfile(@Body() createProfileDTO: CreateProfileDTO) {
    const data = await this.profileService.createProfile(createProfileDTO);
    return data;
  }
}
