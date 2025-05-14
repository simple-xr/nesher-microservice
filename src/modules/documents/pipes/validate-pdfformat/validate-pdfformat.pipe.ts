import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePdfformatPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.mimetype !== 'application/pdf') {
      throw new BadRequestException('Documento deve ser PDF');
    } else return value;
  }
}
