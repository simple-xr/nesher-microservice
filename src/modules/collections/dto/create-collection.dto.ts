import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCollectionDto {
    @ApiProperty({
        example: "IRAÚNA",
        description: 'nome da coleção a ser criada.',
        default: null,
        required: true,
      })
  @IsString()
  name: string;
  @ApiProperty({
    example: "['0xFFF', 'FFFFF']",
    description: 'códigos hexadecimais das cores disponíveis na coleção.',
    default: null,
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  colors: string[];
  @ApiProperty({
    example: "['branco', 'preto']",
    description: 'nomes das cores cujos códigos foram inseridsos no campo "colors" na mesma ordem.',
    default: null,
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  color_names: string[];
}
