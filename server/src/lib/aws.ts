import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
import { uuid } from "@/utils";

const bucketName = process.env.AWS_BUCKET_NAME!;

const createStorageClient = () => {
  return new S3({
    region: "auto",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.AWS_ENDPOINT,
    maxAttempts: 3,
  });
};

const uploadFile = async (file: Express.Multer.File) => {
  const client = createStorageClient();

  const key = uuid();

  await client.putObject({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  return key;
};

const deleteFile = async (Key: string) => {
  const client = createStorageClient();

  const result = await client.deleteObject({
    Bucket: bucketName,
    Key,
  });

  return result;
};

const getFiles = async () => {
  const client = createStorageClient();

  const result = await client.listObjects({
    Bucket: bucketName,
  });

  return result.Contents;
};

export const AWS = {
  deleteFile,
  uploadFile,
  getFiles,
  createStorageClient,
};
