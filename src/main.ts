import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') 

  app.enableCors({
    origin: 'http://localhost:3001', // origen de tu aplicación Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }),


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo deja los campos esperados
      forbidNonWhitelisted: true, // avisa que esta mandando campos de mas
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )


  await app.listen(process.env.PORT);
}
bootstrap();
