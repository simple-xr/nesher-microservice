import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class ParamsDto {
    @ApiProperty({
      example: 1,
      description: 'numero da página a ser retornada pela requisição.',
      default: 1,
      required: false,
    })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    page?: number;
    @ApiProperty({
      example: 5,
      description:
        'quantidade de elementos a serem retornados por cada página da requisição.',
      default: 30,
      required: false,
    })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    perPage?: number;
  }