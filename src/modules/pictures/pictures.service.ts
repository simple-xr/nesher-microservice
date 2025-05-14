import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { FilesService } from 'aws/files.service';
import { PicturesRepository } from './repositories/pictures.prisma,repository';
import { PictureParamsDto } from './dto/pictures-params.dto';

@Injectable()
export class PicturesService {
  constructor(
    private readonly filesService: FilesService,
    private readonly picturesRepository: PicturesRepository,
  ) {}
  async create(picture: Express.Multer.File, collectionId: string) {
    const url = await this.filesService.uploadFile(
      picture,
      `pictures/${collectionId}`,
    );

    return this.picturesRepository.create(url, collectionId);
  }

  findAll(picturesParams: PictureParamsDto) {
    return this.picturesRepository.findAll(picturesParams);
  }

  async findOne(id: string) {
    try {
      return await this.picturesRepository.findOne(id);
    } catch {
      throw new NotFoundException('imagem não encontrada.');
    }
  }

  

  remove(id: string) {
    return this.picturesRepository.delete(id)
  }
}
