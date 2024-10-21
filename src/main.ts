import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(json({ limit: '100mb' }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nesher - File Server Microservice')
    .setDescription(
      'Microserviço de fileserver para o configurador nesher da Bugaboo Studio',
    )
    .setVersion('0.01')
    .addTag('Nesher, Móveleiro, Bugaboo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  console.log(
    `Nesher File Server API Started at port ${port}`,
  );
  await app.listen(port);
}
bootstrap();
