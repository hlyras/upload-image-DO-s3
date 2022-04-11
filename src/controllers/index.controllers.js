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
		console.log(imageData);
		await fs.promises.unlink(newPath);
	};

	res.send({ msg: 'upload realizado com sucesso' });
};

module.exports = {
	renderIndex,
	uploadFile
};