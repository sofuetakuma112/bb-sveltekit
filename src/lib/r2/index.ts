import { v4 as uuidv4 } from 'uuid';

type S3ImageType = 'avatars' | 'posts';

async function uploadImageToR2(
  r2: R2Bucket,
  file: File,
  type: S3ImageType
): Promise<string> {
  const key = `${type}/${uuidv4()}`;

  const arrayBuffer = await file.arrayBuffer();

  await r2.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type
    }
  });

  return key;
}

async function getImageUrlFromR2(r2: R2Bucket, key: string | null) {
  if (!key) return '';

  if (key.startsWith('http') || key.startsWith('https')) {
    return key;
  }

  return `/images/${key}`;
}

export { getImageUrlFromR2, uploadImageToR2 };
