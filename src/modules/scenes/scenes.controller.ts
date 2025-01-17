import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Render,
  HttpCode,
  UploadedFile,
} from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './../../../aws/files.service';
import { SceneExistPipe } from './pipes/scene-exist/scene-exist.pipe';

@Controller('scenes')
export class ScenesController {
  constructor(
    private readonly scenesService: ScenesService,
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
  @UseInterceptors(FileInterceptor('glb'))
  @HttpCode(201)
  @Post('')
  async uploadScene(@UploadedFile() scene: Express.Multer.File) {
    const fileUrl = await this.filesService.uploadFile(scene, 'scenes');
    return this.scenesService.create(fileUrl);
  }

  @Get()
  findAll() {
    return this.scenesService.findAll();
  }

  @Render('model-viewer')
  @Get(':id')
  async findOne(@Param('id', SceneExistPipe) id: string) {
    const scene = await this.scenesService.findOne(id);
    return { scene: scene.glb };
  }

  @Delete(':id')
  remove(@Param('id', SceneExistPipe) id: string) {
    return this.scenesService.remove(id);
  }
}
