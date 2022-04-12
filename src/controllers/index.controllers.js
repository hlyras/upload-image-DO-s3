const Image = require('../models/image');
const { uploadFileS3 } = require("../lib/s3");
const { compressImage } = require("../lib/sharp");

const fs = require("fs");

const renderIndex = async (req, res) => {
	res.render('upload');
};

const getFiles = async (req, res) => {
	let images = await Image.list();

	res.render('files', { images });
};

const uploadFile = async (req, res) => {
	for(let i in req.files){
		let newPath = await compressImage(req.files[i], 425);
		let imageData = await uploadFileS3(newPath, req.files[i].filename.split('.')[0] + '.png');
		await fs.promises.unlink(newPath);

		let image = new Image();
		image.etag = imageData.ETag.replaceAll(`"`, "");
		image.url = imageData.Location;
		image.keycode = imageData.Key;
		await image.save();
	};

	res.send({ msg: 'upload realizado com sucesso' });
};

const deleteFile = async (req, res) => {
	

	// const param = {
	//     Bucket: process.env.BUCKET_NAME,
	//     Key: fileName
	// };

	// s3.deleteObject(param, function (err, data) {
	//     if (err) { console.log('err', err) }
	//     console.log('data', data)
	// });

	res.send({ msg: 'Imagem deletada com sucesso!' });
};

module.exports = {
	renderIndex,
	uploadFile,
	getFiles
};