import * as path from 'path';
import * as dotenv from 'dotenv';
import { APP_ENV } from './enums';

const envFile =
  process.env.NODE_ENV === APP_ENV.PRODUCTION
    ? '.env.prod'
    : process.env.NODE_ENV === APP_ENV.DEVELOPMENT
      ? '.env.dev'
      : process.env.NODE_ENV === APP_ENV.UAT
        ? '.env.uat'
        : '.env';

dotenv.config({ path: path.join(__dirname, `../${envFile}`) });

const BASE_PATH = path.join(__dirname, '../src/db');

module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
      stub: path.join(BASE_PATH, 'stubs/migration_template.ts'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  dev: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
      stub: path.join(BASE_PATH, 'stubs/migration_template.ts'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  uat: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
      stub: path.join(BASE_PATH, 'stubs/migration_template.ts'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  prod: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
      stub: path.join(BASE_PATH, 'stubs/migration_template.ts'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
