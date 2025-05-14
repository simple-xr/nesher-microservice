import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from 'aws/files.service';
import { CollectionsModule } from './modules/collections/collections.module';
import { FurnituresModule } from './modules/furnitures/furnitures.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PicturesModule } from './modules/pictures/pictures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CollectionsModule,
    FurnituresModule,
    ScenesModule,
    DocumentsModule,
    PicturesModule,
  ],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
