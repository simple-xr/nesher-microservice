import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsHexColor,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Collection } from 'src/modules/collections/entities/collection.entity';
import { FileBase64Dto } from './file-base64.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFurnitureUploadDto {
  @ApiProperty({
    example: 'armário preto de cozinha',
    description: 'nome do móvel a ser criado.',
    required: true,
  })
  @IsString()
  nome: string;
  @ApiProperty({
    description:
      'Objeto com extensão, mimetype e string base64 do modelo .glb do móvel.',
    required: true,
  })
  @IsObject()
  @Type(() => FileBase64Dto)
  local: FileBase64Dto;
  @ApiProperty({
    example: 'true',
    description: 'define se o móvel deve ser colocado na fileira de cima.',
    required: true,
  })
  @IsBoolean()
  colocarCima: boolean;
  @ApiProperty({
    example: 'true',
    description: 'define se o móvel deve ser colocado a direita.',
    required: true,
  })
  @IsBoolean()
  colocarDireita: boolean;
  @ApiProperty({
    example: 'true',
    description: 'define se o móvel deve ser colocado a esquerda.',
    required: true,
  })
  @IsBoolean()
  colocarEsquerda: boolean;
  @ApiProperty({
    example: 'chao',
    description: 'define se é um móvel de chão ou superior.',
    required: true,
  })
  @IsString()
  @IsIn(['cima', 'chao', 'pia'])
  tipo: string;
  @ApiProperty({
    example: 2,
    description: 'quantidade de espaço horizontal ocupada pelo móvel.',
    required: true,
  })
  @IsNumber()
  tamanhox: number;
  @ApiProperty({
    example: 1,
    description: 'quantidade de espaço vertical ocupada pelo móvel.',
    required: true,
  })
  @IsNumber()
  tamanhoy: number;
  @ApiProperty({
    example: "['branco', 'preto']",
    description: 'cores do móvel, escritas por extenso.',
    default: null,
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  cor: string[];
  @ApiProperty({
    example: true,
    description: 'define se deve haver um botão no móvel.',
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  botao: boolean;
  @IsBoolean()
  @IsOptional()
  canto: boolean;
  @ApiProperty({
    example: 'BALCAO',
    description: 'define a categoria a qual o móvel pertence.',
    required: true,
  })
  @IsString()
  @IsIn(['BALCAO', 'ARMARIO', 'PANELEIRO', 'ACESSORIO'])
  category: 'BALCAO' | 'ARMARIO' | 'PANELEIRO' | 'ACESSORIO';
  @ApiProperty({
    example: 'Balcões',
    description: 'nome da categoria por extenso para uso pelo front end.',
    required: true,
  })
  @ApiProperty({
    description:
      'Objeto com extensão, mimetype e string base64 da thumbnail do móvel.',
    required: true,
  })
  @IsObject()
  @Type(() => FileBase64Dto)
  img: FileBase64Dto;
  @ApiProperty({
    description: 'id da coleção a qual o móvel pertencerá.',
    required: true,
  })
  @IsString()
  collection_id: string;
  @IsNumber()
  @IsInt()
  order: number;
}
