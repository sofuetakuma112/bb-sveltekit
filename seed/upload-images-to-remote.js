import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import 'dotenv/config';

const imagesDir = './seed/images';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

function getContentType(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    default:
      throw Error('unsupport file type');
  }
}

async function uploadImageToS3(filePath, key) {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: getContentType(filePath)
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    return data;
  } catch (error) {
    console.error('Error uploading to S3', error);
    throw error;
  }
}

async function uploadImage(imagePath, filenameWithoutExt) {
  const key = `posts/${filenameWithoutExt}`;

  try {
    await uploadImageToS3(imagePath, key);
  } catch (error) {
    console.error(`Failed to upload image: ${filenameWithoutExt}`, error);
  }
}

async function processImages() {
  // S3上のpostsディレクトリ配下のファイル一覧を取得
  const listParams = {
    Bucket: process.env.BUCKET_NAME,
    Prefix: 'posts/'
  };

  const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));
  const existingFiles = new Set(listedObjects.Contents.map((item) => path.basename(item.Key)));

  console.log('existingFiles.length:', Array.from(existingFiles).length);

  const files = await fs.promises.readdir(imagesDir);
  for (const file of files) {
    try {
      const filenameWithoutExt = file.split('.')[0];
      const imagePath = path.join(imagesDir, file);
      const imageStats = await fs.promises.stat(imagePath);

      if (imageStats.isFile() && !existingFiles.has(filenameWithoutExt)) {
        console.log('current file:', file);
        await uploadImage(imagePath, filenameWithoutExt);
      }
    } catch (error) {
      console.error(`Failed to process image: ${file}`, error);
    }
  }
}

processImages()
  .then(() => {
    console.log('All images processed.');
  })
  .catch((error) => {
    console.error('Error processing images', error);
  });
