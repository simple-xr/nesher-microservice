import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FilesService } from 'aws/files.service';
import { DocumentsRepository } from './repositories/documents.repository';
import { DocumentsParamsDto } from './dto/documents-param.dto';
import { NotFoundError } from 'rxjs';
import { IsString } from 'class-validator';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly fileService: FilesService,
    private readonly documentsRepository: DocumentsRepository,
  ) {}
  async create(document: Express.Multer.File, collectionId: string) {
    const url = await this.fileService.uploadFile(
      document,
      `documents/${collectionId}`,
    );

    return this.documentsRepository.create(url, collectionId);
  }

  findAll(documentsParam: DocumentsParamsDto) {
    return this.documentsRepository.findAll(documentsParam);
  }

  async findOne(id: string) {
    try {
      return await this.documentsRepository.findOne(id);
    } catch {
      throw new NotFoundException('documento não encontrado.');
    }
  }

  remove(id: string) {
    return this.documentsRepository.delete(id);
  }
}
