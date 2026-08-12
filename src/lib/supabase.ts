import { CreateBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "media";

const projectUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sthszzbmmoigyebkvkrk.supabase.co";

export function publicMediaUrl(path: string) {
  return `${projectUrl.replace(/\/$/, "")}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}

function getS3() {
  const endpoint = process.env.SUPABASE_S3_ENDPOINT;
  const region = process.env.SUPABASE_S3_REGION || "eu-central-1";
  const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SUPABASE_S3_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Supabase S3 env eksik: SUPABASE_S3_ENDPOINT / SUPABASE_S3_ACCESS_KEY_ID / SUPABASE_S3_SECRET_ACCESS_KEY",
    );
  }

  return new S3Client({
    forcePathStyle: true,
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

let bucketReady = false;

async function ensureBucket(client: S3Client) {
  if (bucketReady) return;
  try {
    await client.send(
      new CreateBucketCommand({
        Bucket: MEDIA_BUCKET,
      }),
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // already exists / owned is fine
    if (!/BucketAlreadyOwnedByYou|BucketAlreadyExists|already exists/i.test(msg)) {
      // Supabase may return different errors when bucket exists; continue to upload
      console.warn("[storage] create bucket:", msg);
    }
  }
  bucketReady = true;
}

export async function uploadMediaObject(params: {
  path: string;
  body: Buffer;
  contentType: string;
}) {
  const client = getS3();
  await ensureBucket(client);
  await client.send(
    new PutObjectCommand({
      Bucket: MEDIA_BUCKET,
      Key: params.path,
      Body: params.body,
      ContentType: params.contentType,
      ACL: "public-read",
    }),
  );
  return publicMediaUrl(params.path);
}
