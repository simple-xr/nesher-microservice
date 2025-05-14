import { PrismaService } from 'prisma/prisma.service';
import { PicturesRepository } from '../pictures.prisma,repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PicturesPrismaRepository implements PicturesRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(url: string, collectionId: string) {
    return this.prisma.picture.create({
      data: {
        url,
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  }
  findOne(id: string) {
    return this.prisma.picture.findUniqueOrThrow({ where: { id } });
  }
  async findAll(picturesParams: any) {
    var { page, perPage, collection_id } = picturesParams;
    page = page * 1 || 1;
    perPage = perPage * 1 || 5;

    const pictures = await this.prisma.picture.findMany({
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
      count: pictures.length,
      data: pictures,
    };
  }
  delete(id: string) {
    return this.prisma.picture.delete({ where: { id } });
  }
}
