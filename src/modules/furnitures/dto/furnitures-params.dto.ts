import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ParamsDto } from 'src/dtos/pagination.dto';

export class FurnitureParamsDto extends ParamsDto {
  @ApiProperty({
    example: 'armário preto de cozinha',
    description: 'nome do móvel a ser filtrado.',
    required: true,
  })
  @IsString()
  @IsOptional()
  nome: string;
  @ApiProperty({
    example: 'BALCAO',
    description: 'filtra a categoria a qual o móvel pertence.',
    required: true,
  })
  @IsString()
  @IsOptional()
  @IsIn(['BALCAO', 'ARMARIO', 'PANELEIRO', 'ACESSORIO'])
  category: 'BALCAO' | 'ARMARIO' | 'PANELEIRO' | 'ACESSORIO';
  @ApiProperty({
    example: 'chao',
    description: 'filtra se é um móvel de chão ou superior.',
    required: true,
  })
  @IsString()
  @IsOptional()
  @IsIn(['cima', 'chao'])
  tipo: 'cima' | 'chao';
  @ApiProperty({
    example: 'Off White',
    description: 'filtra móveis por cor.',
    required: true,
  })
  @IsOptional()
  @IsString()
  cor: string;
  @ApiProperty({
    example: '2',
    description: 'filtra móveis por espaço horizontal ocupado.',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  tamanhox: number;
  @ApiProperty({
    example: '1',
    description: 'filtra móveis por espaço vertical ocupado.',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  tamanhoy: number;
  @ApiProperty({
    description: 'filtra móveis pela sua coleção.',
    required: true,
  })
  @IsOptional()
  @IsString()
  collection_id: string;
}
