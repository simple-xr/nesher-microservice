import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { CollectionsModule } from '../collections/collections.module';
import { PrismaService } from 'prisma/prisma.service';
import { FilesService } from 'aws/files.service';
import { PicturesRepository } from './repositories/pictures.prisma,repository';
import { PicturesPrismaRepository } from './repositories/prisma/pictures.prisma.repository';

@Module({
  controllers: [PicturesController],
  providers: [
    PicturesService,
    PrismaService,
    FilesService,

    { provide: PicturesRepository, useClass: PicturesPrismaRepository },
  ],
  imports: [CollectionsModule],
})
export class PicturesModule {}
