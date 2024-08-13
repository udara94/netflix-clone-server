import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${process.env.NODE_ENV}/api`);
  await app.listen(3000);
}
bootstrap();
