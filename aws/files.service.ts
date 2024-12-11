import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
  PutObjectAclCommand,
  PutObjectCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { s3Client } from './config/s3Client.aws';
import { Stream } from 'stream';
import { StartUploadDto } from './config/dtos/start-upload.dto';
import { CompleteUploadDto } from './config/dtos/complete-upload.dto';
import { UploadPartDto } from './config/dtos/upload-part.dto';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File, folder: string) {
    const fileKey = `${folder}/${Date.now()}-${file.originalname}`;
    const uploadObject = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      const response = await s3Client.send(uploadObject);

      return `${process.env.BUCKET_URL}${encodeURI(fileKey)}`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getFile(fileName: string, folder: string) {
    const downloadObject = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `${folder}/${encodeURIComponent(fileName)}`,
    });

    try {
      const { Body, ContentType } = await s3Client.send(downloadObject);

      return {
        ContentType,
        file: new StreamableFile(await Body.transformToByteArray()),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async startUploadMultiPart(body: StartUploadDto) {
    const { fileName, fileType } = body;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `videos/${fileName}`,
      ContentType: `fileType`,
    };

    const multiPartObject = new CreateMultipartUploadCommand(params);

    try {
      const response = await s3Client.send(multiPartObject);
      return { uploadId: response.UploadId };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async uploadParts(data: UploadPartDto) {
    const { fileName, partNumber, uploadId, fileChunk } = data;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `videos/${fileName}`,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: Buffer.from(fileChunk, 'base64'),
    };

    const uploadPartObject = new UploadPartCommand(params);
    try {
      const response = await s3Client.send(uploadPartObject);

      return { Etag: response.ETag };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async completeUpload(data: CompleteUploadDto) {
    const { fileName, uploadId, parts } = data;
    console.log(uploadId);
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `videos/${fileName}`,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    };

    const completeUploadObject = new CompleteMultipartUploadCommand(params);

    try {
      const complete = await s3Client.send(completeUploadObject);
      console.log({ complete });
      return { fileUrl: complete.Location };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async uploadFromBase64(
    file64: string,
    folder: string,
    name: string,
    contentType: string,
  ) {
    const fileKey = `${folder}/${Date.now()}-${name}`;
    const uploadObject = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
      Body: Buffer.from(file64, 'base64'),
      ContentType: `${contentType}`,
    });
    try {
      const response = await s3Client.send(uploadObject);

      return `${process.env.BUCKET_URL}${encodeURI(fileKey)}`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
