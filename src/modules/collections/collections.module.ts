import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CollectionsRepository } from './repositories/collection.repositories';
import { CollectionsPrismaRepository } from './repositories/prisma/collection.prisma.repositories';

@Module({
  controllers: [CollectionsController],
  providers: [
    CollectionsService,
    PrismaService,
    {provide: CollectionsRepository, useClass: CollectionsPrismaRepository},
  ],
  exports:[
    CollectionsService,
    {provide: CollectionsRepository, useClass: CollectionsPrismaRepository}
  ]
})
export class CollectionsModule {}
