const fs = require("fs");
const aws = require("aws-sdk");

const s3 = new aws.S3({ endpoint: process.env.S3_ENDPOINT })

function uploadFileS3(path, fileName) {
	fs.readFile(path, (err, data) => {
		if (err) throw err; // Something went wrong!
		const uploadParams = {
			Bucket: process.env.BUCKET_NAME,
			Body: data,
			'ACL': 'public-read',
			'ContentType': 'image/webp',
			Key: fileName,
		}

		return s3.upload(uploadParams).promise();
	});
};

module.exports = {
	uploadFileS3
}