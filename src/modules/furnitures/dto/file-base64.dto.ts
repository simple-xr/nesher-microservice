import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';

export class FileBase64Dto {
  @ApiProperty({
    example: "video/mp4",
    description: 'mimetype do arquivo a ser enviado.',
    required: true,
  })
  @IsString()
  mime: string;
  @ApiProperty({
    description: 'string base64 do arquivo a ser enviado.',
    required: true,
  })
  @IsString()
  @IsBase64()
  data: string;
  @ApiProperty({
    example: "mp4",
    description: 'extensão do arquivo a ser enviado, sem ponto.',
    required: true,
  })
  @IsString()
  ext:string;
}
