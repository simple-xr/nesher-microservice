import { IsIn, IsString } from 'class-validator';

export class StartUploadDto {
  @IsString()
  fileName: string;
  @IsString()
  /*@IsIn([
    'video/x-flv',
    'video/mp4',
    'video/x-mpegURL',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ])*/
  fileType:
    | 'video/x-flv'
    | 'video/mp4'
    | 'video/x-mpegURL'
    | 'video/MP2T'
    | 'video/3gpp'
    | 'video/quicktime'
    | 'video/x-msvideo'
    | 'video/x-ms-wmv';
}
