import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(6093);
}
bootstrap();
