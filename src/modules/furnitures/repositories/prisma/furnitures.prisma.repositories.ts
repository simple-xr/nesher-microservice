import { PrismaService } from 'prisma/prisma.service';
import { FurnituresRepository } from '../furnitures.repositories';
import { Injectable } from '@nestjs/common';
import { CreateFurnitureDto } from '../../dto/create-furniture.dto';
import { Furniture } from '../../entities/furniture.entity';
import { plainToInstance } from 'class-transformer';
import { FurnitureParamsDto } from '../../dto/furnitures-params.dto';
import { count } from 'console';
import { UpdateFurnitureDto } from '../../dto/update-furniture.dto';

@Injectable()
export class FurnituresPrismaRepository implements FurnituresRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateFurnitureDto): Promise<Furniture> {
    const nomeMovelArray = ['Balcões', 'Armários', 'Paneleiros', 'Acessórios'];
    const nameCategories = ['BALCAO', 'ARMARIO', 'PANELEIRO', 'ACESSORIO'];
    const { collection_id, ...cleanedData } = data;
    return plainToInstance(
      Furniture,
      await this.prisma.furniture.create({
        data: {
          ...cleanedData,
          nomeMovel: nomeMovelArray[nameCategories.indexOf(data.category)],
          collection: {
            connect: {
              id: data.collection_id,
            },
          },
        },
        include: {
          collection: true,
        },
      }),
    );
  }
  async findAll(params: FurnitureParamsDto): Promise<any> {
    var { page, perPage, cor, ...filterParams } = params;

    if (!page) page = 1;
    if (!perPage) perPage = 5;
    const furnitures = plainToInstance(
      Furniture,
      await this.prisma.furniture.findMany({
        where: {
          ...filterParams,
          cor: {
            has: cor,
          },
        },
        take: perPage,
        skip: (page - 1) * perPage,
        include: {
          collection: true,
        },
        orderBy:{
          order:'desc'
        }
      }),
    );

    return {
      page: page,
      perPage: perPage,
      count: furnitures.length,
      data: furnitures,
    };
  }
  async findOne(id: string): Promise<Furniture> {
    return plainToInstance(
      Furniture,
      await this.prisma.furniture.findUniqueOrThrow({
        where: { id },
        include: {
          collection: true,
        },
      }),
    );
  }
  async update(id: string, data: UpdateFurnitureDto): Promise<Furniture> {
    return plainToInstance(
      Furniture,
      await this.prisma.furniture.update({
        where: { id },
        data: { ...data, updated_at: new Date() },

        include: {
          collection: true,
        },
      }),
    );
  }
  async delete(id: string): Promise<Furniture> {
    return await this.prisma.furniture.delete({
      where: { id },
    });
  }
}
