import { CollectionsParamsDto } from '../dto/collections-params.dto';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';
import { Collection } from '../entities/collection.entity';

export abstract class CollectionsRepository {
  abstract create(data: CreateCollectionDto): Promise<Collection>;
  abstract findAll(params: CollectionsParamsDto): Promise<any>;
  abstract findOne(id: string): Promise<Collection>;
  abstract update(id: string, data: UpdateCollectionDto): Promise<Collection>;
  abstract delete(id: string): Promise<Collection>;
}
