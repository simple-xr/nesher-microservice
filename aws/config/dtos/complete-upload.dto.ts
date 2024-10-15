import { CompletedPart } from '@aws-sdk/client-s3';
import { IsArray, IsString } from 'class-validator';

export class CompleteUploadDto {
  @IsString()
  fileName: string;
  @IsString()
  uploadId: string;
  @IsArray()
  parts: CompletedPart[];
}
