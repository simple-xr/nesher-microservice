import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'aws/files.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('scenes')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly filesService: FilesService,
  ) {}

  @ApiResponse({ status: 201, description: 'cena criada com sucesso.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "multipart/form-data com o arquivo subido no campo 'scene'",
    required: true,
    schema: {
      type: 'object',
      properties: {
        scene: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary:
      'cria uma cena a partir de uma glb enviado através de multipart/form-data.',
  })
  @UseInterceptors(FileInterceptor('scene'))
  @Render('model-viewer')
  @HttpCode(201)
  @Post('upload-scene')
  async uploadScene(@UploadedFile() scene: Express.Multer.File) {
    const fileUrl = await this.filesService.uploadFile(scene, 'scenes');

    return { scene: fileUrl };
  }
}
