import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { CreateFurnitureUploadDto } from './dto/create-furniture-upload.dto';
import { FurnituresRepository } from './repositories/furnitures.repositories';
import { FilesService } from 'aws/files.service';
import { CollectionsService } from '../collections/collections.service';
import { FurnitureParamsDto } from './dto/furnitures-params.dto';

@Injectable()
export class FurnituresService {
  constructor(
    private readonly furnituresRepository: FurnituresRepository,
    private readonly filesService: FilesService,
    private readonly collectionsService: CollectionsService,
  ) {}
  async create(data: CreateFurnitureUploadDto) {
    console.log('passou aqui')
    const collection = await this.collectionsService.findOne(
      data.collection_id,
    );
    const glbUrl = await this.filesService.uploadFromBase64(
      data.local.data,
      `${collection.name}/glbs`,
      `${data.nome}.${data.local.ext}`,
      data.local.mime,
    );
    const imageUrl = await this.filesService.uploadFromBase64(
      data.img.data,
      `${collection.name}/images`,
      `${data.nome}.${data.img.ext}`,
      data.img.mime,
    );
    const createFurnitureDto: CreateFurnitureDto = {
      ...data,
      img: imageUrl,
      local: glbUrl,
    };
    return this.furnituresRepository.create(createFurnitureDto);
  }

  findAll(params: FurnitureParamsDto) {
    return this.furnituresRepository.findAll(params);
  }

  async findOne(id: string) {
    try {
      return await this.furnituresRepository.findOne(id);
    } catch {
      throw new NotFoundException('móvel não encontrado');
    }
  }

  async update(id: string, data: UpdateFurnitureDto) {
    return await this.furnituresRepository.update(id, data);
  }

  async remove(id: string) {
    return await this.furnituresRepository.delete(id);
  }
}
