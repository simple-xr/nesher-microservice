import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PicturesService } from '../../pictures.service';

@Injectable()
export class PictureExistsPipe implements PipeTransform {
  constructor(private readonly picturesService:PicturesService){}
  async transform(value: string, metadata: ArgumentMetadata) {
    await this.picturesService.findOne(value)
    return value;
  }
}
