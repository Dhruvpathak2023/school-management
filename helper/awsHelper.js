const dotenv = require("dotenv");
const aws = require("aws-sdk");
const crypto = require("crypto");
const util = require("util");
const fs = require("fs");
const url = require("url");
const config = require("../config/config")

const randomBytes = util.promisify(crypto.randomBytes);

const region = config.REGION;
const bucketName = config.BUCKETNAME;
const accessKeyId = config.ACCESSKEYID;
const secretAccessKey = config.SECRETACCESSKEY;

const s3 = new aws.S3({
    region, accessKeyId, secretAccessKey, signatureVersion: "v4",
})

exports.uploadImagefromBackendtoAWS = async(file,res)=>{
    if (!file) return null;
  console.log(file.name);
  let file_name = file.name;
  if (file_name !== undefined) {
    file_name = file_name.replace(/\s/g, '').trim();
    file_name = `${Date.now()}_${file_name}`;
  } else {
    file_name = `${Date.now()}`;
  }

  const params = {
    Bucket: bucketName,
    Key: file_name,
    Body: file.data instanceof Buffer ? file.data : file.data.buffer,
    ACL: 'public-read',
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const publicUrl = uploadResult.Location;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}

exports.deleteImagefromBackendfromAWS = async(file)=>{
    try {
        function extractS3ParamsFromUrl(imageUrl) {
          const parsedUrl = url.parse(imageUrl);
          const key = parsedUrl.pathname.split("/")[2]; // Remove the leading slash
          console.log(key);
          let params = {
            Key: key,
            Bucket: bucketName,
          };
          s3.deleteObject(params, (err, data) => {
            if (err) {
              console.error("Error deleting object:", err);
            } else {
              console.log("Object deleted successfully", data);
            }
          });
        }
        extractS3ParamsFromUrl(file)
      } catch (error) {
        console.error("Error Deleting JSON file from S3:", error)
        throw error;
      }
}