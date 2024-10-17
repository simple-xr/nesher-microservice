import { Type } from 'class-transformer';
import { Furniture } from 'src/modules/furnitures/entities/furniture.entity';

export class Collection {
  id: string;
  name: string;
  colors: string[];
  color_names: string[];
  @Type(() => Furniture)
  furnitures?: Furniture[];
}
