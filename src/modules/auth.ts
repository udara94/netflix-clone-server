import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/controllers';
import { UserService } from 'src/services';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService],
})
export class AuthModule {}
