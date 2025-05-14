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
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Collection } from '@prisma/client';
import { CollectionExistPipePipe } from '../collections/pipes/collection-exist-pipe/collection-exist-pipe.pipe';
import { ValidateImageFormatPipe } from './pipes/validate-image-format/validate-image-format.pipe';
import { PictureParamsDto } from './dto/pictures-params.dto';
import { PictureExistsPipe } from './pipes/picture-exists/picture-exists.pipe';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @UseInterceptors(FileInterceptor('picture'))
  @Post(':collectionId')
  create(
    @UploadedFile(ValidateImageFormatPipe) picture: Express.Multer.File,
    @Param('collectionId', CollectionExistPipePipe) collection: Collection,
  ) {
    console.log(picture);
    return this.picturesService.create(picture, collection.id);
  }

  @Get()
  findAll(@Query() picturesParams: PictureParamsDto) {
    return this.picturesService.findAll(picturesParams);
  }

  @Get(':id')
  findOne(@Param('id', PictureExistsPipe) id: string) {
    return this.picturesService.findOne(id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', PictureExistsPipe) id: string) {
    return this.picturesService.remove(id);
  }
}
