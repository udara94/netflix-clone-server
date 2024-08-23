import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from 'src/controllers';
import { ProfileRepository } from 'src/repositories';
import { ProfileService } from 'src/services';

@Module({
  imports: [ConfigModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
