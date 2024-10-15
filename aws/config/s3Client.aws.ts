import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';

export const s3Client = new S3Client({
  credentials: fromEnv(),
  region: process.env.AWS_REGION,
});


