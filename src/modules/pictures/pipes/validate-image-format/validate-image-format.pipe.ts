import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateImageFormatPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const allowedMimeTypes = [
      'image/avif',
      'image/bmp',
      'image/gif',
      'image/heic',
      'image/heif',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
      'image/x-icon',
      'image/x-ms-bmp',
      'image/apng',
      'image/jxl',
      'image/vnd.adobe.photoshop',
      'image/vnd.microsoft.icon',
      'image/x-canon-cr2',
      'image/x-nikon-nef',
      'image/x-portable-anymap',
      'image/x-portable-bitmap',
      'image/x-portable-graymap',
      'image/x-portable-pixmap',
      'image/x-sony-arw',
      'image/x-tga',
      'image/x-xbitmap',
      'image/x-xpixmap',
    ];

    if (!allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException('arquivo deve ser uma imagem.');
    }
    return value;
  }
}
