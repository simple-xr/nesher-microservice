import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CollectionsService } from '../../collections.service';

@Injectable()
export class CollectionExistPipePipe implements PipeTransform {
  constructor(private readonly collections: CollectionsService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const collection = await this.collections.findOne(value);

    return collection
  }
}
