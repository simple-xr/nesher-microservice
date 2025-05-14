import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  HttpCode,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidatePdfformatPipe } from './pipes/validate-pdfformat/validate-pdfformat.pipe';
import { CollectionExistPipePipe } from '../collections/pipes/collection-exist-pipe/collection-exist-pipe.pipe';
import { Collection } from '../collections/entities/collection.entity';
import { DocumentsParamsDto } from './dto/documents-param.dto';
import { DocumentsExistsPipe } from './pipes/documents-exists/documents-exists.pipe';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseInterceptors(FileInterceptor('document'))
  @Post(':collectionId')
  create(
    @UploadedFile(ValidatePdfformatPipe) document: Express.Multer.File,
    @Param('collectionId', CollectionExistPipePipe) collection: Collection,
  ) {
    return this.documentsService.create(document, collection.id);
  }

  @Get()
  findAll(@Query() documentsParam: DocumentsParamsDto) {
    return this.documentsService.findAll(documentsParam);
  }

  @Get(':id')
  findOne(@Param('id', DocumentsExistsPipe) id: string) {
    return this.documentsService.findOne(id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', DocumentsExistsPipe) id: string) {
    return this.documentsService.remove(id);
  }
}
