import { PrismaService } from 'prisma/prisma.service';
import { DocumentsRepository } from '../documents.repository';
import { Document } from '../../entities/document.entity';
import { Injectable } from '@nestjs/common';
import { DocumentsParamsDto } from '../../dto/documents-param.dto';

@Injectable()
export class DocumentsPrismaRepository implements DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(url: string, collectionId: string): Promise<Document> {
    return this.prisma.document.create({
      data: {
        url,
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
      include: {
        collection: true,
      },
    });
  }
  findOne(id: string) {
    return this.prisma.document.findUniqueOrThrow({
      where: { id },
    });
  }
  async findAll(documentsParam: DocumentsParamsDto) {
    var { page, perPage, collection_id } = documentsParam;
    page = page * 1 || 1;
    perPage = perPage * 1 || 5;

    const documents = await this.prisma.document.findMany({
      where: {
        collection_id,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        collection: true,
      },
    });
    return {
      page: page,
      perPage: perPage,
      count: documents.length,
      data: documents,
    };
  }

  delete(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
