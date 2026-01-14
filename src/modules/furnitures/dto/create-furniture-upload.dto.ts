import { Transform, Type } from 'class-transformer';
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
  @IsString()
  @IsIn(['true', 'false'])
  colocarCima: string;
  @ApiProperty({
    example: 'true',
    description: 'define se o móvel deve ser colocado a direita.',
    required: true,
  })
  @IsString()
  @IsIn(['true', 'false'])
  colocarDireita: string;
  @ApiProperty({
    example: 'true',
    description: 'define se o móvel deve ser colocado a esquerda.',
    required: true,
  })
  @IsString()
  @IsIn(['true', 'false'])
  colocarEsquerda: string;
  @ApiProperty({
    example: 'chao',
    description: 'define se é um móvel de chão ou superior.',
    required: true,
  })
  @IsString()
  @IsIn(['cima', 'chao', 'pia', 'bancada_pia'])
  tipo: string;
  @ApiProperty({
    example: 2,
    description: 'quantidade de espaço horizontal ocupada pelo móvel.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  tamanhox: number;
  @ApiProperty({
    example: 1,
    description: 'quantidade de espaço vertical ocupada pelo móvel.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  tamanhoy: number;
  @ApiProperty({
    example: "['branco', 'preto']",
    description: 'cores do móvel, escritas por extenso.',
    default: null,
    required: true,
  })
  @Transform(({ value }) => value.split(',').map((item) => item.trim()))
  @IsArray()
  @ArrayMinSize(1)
  cor: string[];
  @ApiProperty({
    example: true,
    description: 'define se deve haver um botão no móvel.',
    required: true,
  })
  @IsString()
  @IsIn(['true', 'false'])
  @IsOptional()
  botao: string;

  @IsString()
  @IsIn(['true', 'false'])
  @IsOptional()
  canto: string;
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
  @IsString()
  collection_id: string;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsInt()
  order: number;
}
