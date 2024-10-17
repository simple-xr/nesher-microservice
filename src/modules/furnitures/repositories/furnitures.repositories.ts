import { CreateFurnitureDto } from '../dto/create-furniture.dto';
import { FurnitureParamsDto } from '../dto/furnitures-params.dto';
import { UpdateFurnitureDto } from '../dto/update-furniture.dto';
import { Furniture } from '../entities/furniture.entity';

export abstract class FurnituresRepository {
  abstract create(data: CreateFurnitureDto): Promise<Furniture>;
  abstract findAll(params: FurnitureParamsDto): Promise<any>;
  abstract findOne(id: string): Promise<Furniture>;
  abstract update(id: string, data: UpdateFurnitureDto): Promise<Furniture>;
  abstract delete(id: string): Promise<Furniture>;
}
