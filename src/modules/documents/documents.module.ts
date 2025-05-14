import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { CollectionsModule } from '../collections/collections.module';
import { PrismaService } from 'prisma/prisma.service';
import { CollectionsService } from '../collections/collections.service';
import { DocumentsRepository } from './repositories/documents.repository';
import { DocumentsPrismaRepository } from './repositories/prisma/documents.prisma.repository';
import { FilesService } from 'aws/files.service';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    PrismaService,
    CollectionsService,
    { provide: DocumentsRepository, useClass: DocumentsPrismaRepository },
    FilesService,
  ],
  imports: [CollectionsModule],
})
export class DocumentsModule {}
