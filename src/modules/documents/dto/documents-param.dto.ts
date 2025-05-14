import { IsOptional, IsString } from 'class-validator';
import { ParamsDto } from 'src/dtos/pagination.dto';

export class DocumentsParamsDto extends ParamsDto {
  @IsString()
  @IsOptional()
  collection_id: string;
}
