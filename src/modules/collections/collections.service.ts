import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionsRepository } from './repositories/collection.repositories';
import { CollectionsParamsDto } from './dto/collections-params.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}
  async create(data: CreateCollectionDto) {
    return await this.collectionsRepository.create(data);
  }

  async findAll(params: CollectionsParamsDto) {
    return await this.collectionsRepository.findAll(params);
  }

  async findOne(id: string) {
    try {
      return await this.collectionsRepository.findOne(id);
    } catch {
      throw new NotFoundException('coleção não encontrada');
    }
  }

  async update(id: string, data: UpdateCollectionDto) {
    return await this.collectionsRepository.update(id,data);
  }

  async remove(id: string) {
    return await this.collectionsRepository.delete(id);
  }
}
