import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('running on port localhost:3001');
  app.useGlobalPipes(
    new ValidationPipe({
      // field dont have in dto will be remove from request BE
      whitelist: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
