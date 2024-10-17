import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnitureDto } from './create-furniture.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateFurnitureDto extends PartialType(
  OmitType(CreateFurnitureDto, ['local', 'img', 'collection_id'] as const),
) {}
