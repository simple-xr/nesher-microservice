import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(data: CreateFurnitureUploadDto, glb: Express.Multer.File[], img: Express.Multer.File[]) {
    const collection = await this.collectionsService.findOne(data.collection_id);
   
    if(!glb || glb.length === 0) {
      throw new BadRequestException('Arquivo GLB não encontrado');
    }
    if(!img || img.length === 0) {
      throw new BadRequestException('Arquivo imagem não encontrado');
    }

    const colocarCima = data.colocarCima === 'true'
    const colocarDireita = data.colocarDireita === 'true'
    const colocarEsquerda = data.colocarEsquerda === 'true'
    const botao = data.botao === 'true'
    const canto = data.canto === 'true'

    const glbUrl = await this.filesService.uploadFile(glb[0], `furnitures/${collection}/glbs`);
    const imageUrl = await this.filesService.uploadFile(img[0], `furnitures/${collection}/images`);
    const createFurnitureDto: CreateFurnitureDto = {
      ...data,
      colocarCima,
      colocarDireita,
      colocarEsquerda,
      botao,
      canto,
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
  
  async update(id: string, data: UpdateFurnitureDto, glb: Express.Multer.File[], img: Express.Multer.File[]) {
    const furniture = await this.furnituresRepository.findOne(id);
    const collection = await this.collectionsService.findOne(furniture.collection_id);
    var glbUrl = undefined;
    var imageUrl = undefined;
    if(glb && glb.length > 0) {
      glbUrl = await this.filesService.uploadFile(glb[0], `furnitures/${collection}/glbs`);
    }
    if(img && img.length > 0) {
      imageUrl = await this.filesService.uploadFile(img[0], `furnitures/${collection}/images`);
    }
    return await this.furnituresRepository.update(id, data, glbUrl, imageUrl);
  }

  async remove(id: string) {
    return await this.furnituresRepository.delete(id);
  }
}
