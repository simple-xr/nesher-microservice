import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DocumentsService } from '../../documents.service';

@Injectable()
export class DocumentsExistsPipe implements PipeTransform {
  constructor(private readonly documentsService: DocumentsService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    await this.documentsService.findOne(value);
    return value;
  }
}
