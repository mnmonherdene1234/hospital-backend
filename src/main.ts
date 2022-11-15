import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { HttpExceptionFilter } from './app/utils/http-exception.filter';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(6093);
}
bootstrap();
