import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CollectionsService } from 'src/modules/collections/collections.service';

@Injectable()
export class CollectionExistsPipe implements PipeTransform {
  constructor(private readonly collectionService: CollectionsService) {}
  transform(value: string, metadata: ArgumentMetadata) {
    const collection = this.collectionService.findOne(value);
    console.log(value);
    return value;
  }
}
