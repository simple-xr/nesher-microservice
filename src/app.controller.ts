import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'aws/files.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly filesService: FilesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('scene'))
  @Render('model-viewer')
  @Post('upload-scene')
  async uploadScene(@UploadedFile() scene: Express.Multer.File) {
    const fileUrl = await this.filesService.uploadFile(scene, 'scenes');

    return { scene: fileUrl };
  }
}
