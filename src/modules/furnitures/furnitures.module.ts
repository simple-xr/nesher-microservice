import { Module } from '@nestjs/common';
import { FurnituresService } from './furnitures.service';
import { FurnituresController } from './furnitures.controller';
import { FilesService } from 'aws/files.service';
import { PrismaService } from 'prisma/prisma.service';
import { FurnituresRepository } from './repositories/furnitures.repositories';
import { FurnituresPrismaRepository } from './repositories/prisma/furnitures.prisma.repositories';
import { CollectionsModule } from '../collections/collections.module';
import { CollectionsService } from '../collections/collections.service';
import { CollectionsRepository } from '../collections/repositories/collection.repositories';
import { CollectionsPrismaRepository } from '../collections/repositories/prisma/collection.prisma.repositories';

@Module({
  controllers: [FurnituresController],
  providers: [
    FurnituresService,
    FilesService,
    PrismaService,
    { provide: FurnituresRepository, useClass: FurnituresPrismaRepository },
    CollectionsService,
    { provide: CollectionsRepository, useClass: CollectionsPrismaRepository },
  ],
  imports: [CollectionsModule],
})
export class FurnituresModule {}
