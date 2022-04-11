const fs = require("fs");
const aws = require("aws-sdk");

const s3 = new aws.S3({ endpoint: process.env.S3_ENDPOINT });

async function uploadFileS3(path, fileName) {
    let data = await fs.promises.readFile(path);

	const uploadParams = {
		Bucket: process.env.BUCKET_NAME,
		Body: data,
		'ACL': 'public-read',
		'ContentType': 'image/png',
		Key: fileName,
	};

	return s3.upload(uploadParams).promise();
};

module.exports = {
	uploadFileS3
};
