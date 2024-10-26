import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());

  const config = new DocumentBuilder()
    .setTitle('Symphony Data Importer')
    .setDescription(
      'A nestjs server for importing data from the Symphony blockchain and exposing it via REST APIs',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 5001);

  const logger = new Logger('bootstrap');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
