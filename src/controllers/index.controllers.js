const Image = require('../models/image');
const { uploadFileS3 } = require("../lib/s3");
const { compressImage } = require("../lib/sharp");

const fs = require("fs");

const renderIndex = (req, res) => {
	res.render('upload', {
		title: "Upload Image"
	});
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

module.exports = {
	renderIndex,
	uploadFile
};