import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ParamsDto } from "src/dtos/pagination.dto";


export class CollectionsParamsDto extends ParamsDto{
    @ApiProperty({
        example: "IRAÚNA",
        description: 'nome da coleção a ser resgatada do banco de dados.',
        default: null,
        required: false,
      })
    @IsString()
    @IsOptional()
    name:string
}