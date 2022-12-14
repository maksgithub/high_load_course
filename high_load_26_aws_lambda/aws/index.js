// dependencies
const AWS = require('aws-sdk');
const util = require('util');
const sharp = require('sharp');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {

  // Read options from the event parameter.
  console.log("Reading options from event:\n", util.inspect(event, { depth: 5 }));
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const dstBucket = srcBucket + "-resized";
  const dstKey = "resized-" + srcKey;

  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("Could not determine the image type.");
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType != "jpg" && imageType != "png") {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  }

  // Download the image from the S3 source bucket.

  const params = {
    Bucket: srcBucket,
    Key: srcKey
  };
  try {
    var origimage = await s3.getObject(params).promise();

  } catch (error) {
    console.log('Error get object from s3: ', { params });
    console.log(error);
    return;
  }

  try {
    var image = await sharp(origimage.Body);
  } catch (error) {
    console.log(error);
    return;
  }

  await uploadToDestination(await image.toFormat('gif').toBuffer(), srcKey + '.gif');
  await uploadToDestination(await image.toFormat('png').toBuffer(), srcKey + '.png');
  await uploadToDestination(await image.toFormat('heif').toBuffer(), srcKey + '.heif');

  async function uploadToDestination(buffer, dstKey) {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: "image"
    };
    
    try {

      const putResult = await s3.putObject(destparams).promise();

    } catch (error) {
      console.log('error upload', { destparams })
      console.log(error);
      return;
    }

    console.log('Successfully resized ' + srcBucket + '/' + srcKey +
      ' and uploaded to ' + dstBucket + '/' + dstKey);
  }
};