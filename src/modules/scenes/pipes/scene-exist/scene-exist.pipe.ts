import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ScenesService } from './../../scenes.service';

@Injectable()
export class SceneExistPipe implements PipeTransform {
  constructor(private readonly scenesService: ScenesService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const scene = await this.scenesService.findOne(value);

    if (scene) {
      return value;
    } else {
      throw new NotFoundException('cena não existe.');
    }
  }
}
