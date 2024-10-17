import { PrismaService } from 'prisma/prisma.service';
import { CreateCollectionDto } from '../../dto/create-collection.dto';
import { Collection } from '../../entities/collection.entity';
import { CollectionsRepository } from '../collection.repositories';
import { plainToInstance } from 'class-transformer';
import { CollectionsParamsDto } from '../../dto/collections-params.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCollectionDto } from '../../dto/update-collection.dto';

@Injectable()
export class CollectionsPrismaRepository implements CollectionsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCollectionDto): Promise<Collection> {
    return plainToInstance(
      Collection,
      await this.prisma.collection.create({
        data: data,
        include: {
          furnitures: true,
        },
      }),
    );
  }
  async findAll(params: CollectionsParamsDto): Promise<any> {
    var { page, perPage, name } = params;
    if (!page) page = 1;
    if (!perPage) perPage = 5;

    const collections = await this.prisma.collection.findMany({
      where: {
        name: name,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return {
      page: page,
      perPage: perPage,
      count: collections.length,
      data: plainToInstance(Collection, collections),
    };
  }

  async findOne(id: string): Promise<Collection> {
    return plainToInstance(
      Collection,
      this.prisma.collection.findUniqueOrThrow({
        where: { id },
        include: { furnitures: true },
      }),
    );
  }
  async update(id: string, data: UpdateCollectionDto): Promise<Collection> {
    return plainToInstance(
      Collection,
      await this.prisma.collection.update({
        where: { id },
        data: data,
      }),
    );
  }
  async delete(id: string): Promise<Collection> {
    return await this.prisma.collection.delete({
      where: { id },
    });
  }
}
