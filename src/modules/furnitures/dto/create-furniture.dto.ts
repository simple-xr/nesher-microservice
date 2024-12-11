import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsHexColor,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Collection } from 'src/modules/collections/entities/collection.entity';

export class CreateFurnitureDto {
  @IsString()
  nome: string;
  @IsString()
  @IsUrl()
  local: string;
  @IsBoolean()
  colocarCima: boolean;
  @IsBoolean()
  colocarDireita: boolean;
  @IsBoolean()
  colocarEsquerda: boolean;
  @IsString()
  @IsIn(['cima', 'chao'])
  tipo: string;
  @IsNumber()
  tamanhox: number;
  @IsNumber()
  tamanhoy: number;
  @IsString()
  cor: string[];
  @IsBoolean()
  @IsOptional()
  botao: boolean;
  @IsString()
  @IsIn(['BALCAO', 'ARMARIO', 'PANELEIRO', 'ACESSORIO'])
  category: 'BALCAO' | 'ARMARIO' | 'PANELEIRO' | 'ACESSORIO';
  @IsString()
  @IsUrl()
  img: string;
  @IsString()
  collection_id: string;
}
