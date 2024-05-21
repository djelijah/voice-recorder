// api/upload.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: us-east-1
});

export default async function handler(req, res) {
  const { fileName, fileType } = req.body;

  const s3Params = {
    Bucket: 'your-s3-bucket-name',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ uploadURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
