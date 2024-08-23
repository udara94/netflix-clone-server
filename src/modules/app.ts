import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_ENV } from './../enums';
import { KnexModule } from './knex';
import { APPLICATION_NAME } from 'src/const';
import { ErrorInterceptor, TransformInterceptor } from 'src/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth';
import { ProfileModule } from './profile';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          if (process.env.NODE_ENV === APP_ENV.PRODUCTION) {
            const result = require('dotenv').config({ path: '.env.prod' });
            Logger.log('dotenv info ' + result);
            process.env = {
              ...process.env,
              ...result.parsed,
            };
          } else if (process.env.NODE_ENV === APP_ENV.DEVELOPMENT) {
            const result = require('dotenv').config({ path: '.env.dev' });
            Logger.log('dotenv info ' + result);
            process.env = {
              ...process.env,
              ...result.parsed,
            };
          } else if (process.env.NODE_ENV === APP_ENV.UAT) {
            const result = require('dotenv').config({ path: '.env.uat' });
            Logger.log('dotenv info ' + result);
            process.env = {
              ...process.env,
              ...result.parsed,
            };
          } else {
            const result = require('dotenv').config({ path: '.dev' });
            Logger.log('dotenv info ' + result);
            process.env = {
              ...process.env,
              ...result.parsed,
            };
          }
          Logger.log('Env load info ' + process.env.TEST_VAR);
          Logger.log('Env pro info ' + process.env.NODE_ENV);

          return {
            NODE_ENV: process.env.NODE_ENV || 'local',
            APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
            JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
            DB_USER: process.env.DB_USER || 'your-db-user',
            DB_PASSWORD: process.env.DB_PASSWORD || 'your-db-password',
            DB_NAME: process.env.DB_NAME || 'your-db-name',
            AWS_ACCESS_KEY:
              process.env.AWS_ACCESS_KEY || 'your-default-access-key',
            AWS_SECRET_KEY:
              process.env.AWS_SECRET_KEY || 'your-default-secret-key',
            AWS_DEF_REGION:
              process.env.AWS_DEF_REGION || 'your-default-secret-key',
          };
        },
      ],
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          config: {
            client: 'pg',
            connection: {
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              applicationName: APPLICATION_NAME,
            },
          },
        };
      },
    }),
    AuthModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
