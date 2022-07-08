const Image = require('../models/image');
const { uploadFileS3, deleteFileS3 } = require("../lib/s3");
const { compressImage } = require("../lib/sharp");

const fs = require("fs");

const index = async (req, res) => {
	res.render('upload');
};

const files = async (req, res) => {
	res.render('files');
};

const getFiles = async (req, res) => {
	let images = await Image.list();
	res.send(images);
};

const uploadFile = async (req, res) => {
	for(let i in req.files){
		let newPath = await compressImage(req.files[i], 425);
		let imageData = await uploadFileS3(newPath, req.files[i].filename.split('.')[0] + '.png');

		fs.promises.unlink(newPath);
		req.files[i].mimetype != 'image/png' && fs.promises.unlink(req.files[i].path);

		let image = new Image();
		image.etag = imageData.ETag.replaceAll(`"`, "");
		image.url = imageData.Location;
		image.keycode = imageData.Key;
		await image.save();
	};

	res.send({ done: 'upload realizado com sucesso' });
};

const deleteFile = async (req, res) => {
	try {
		await deleteFileS3(req.body.keycode);
		await Image.delete(req.body.keycode);

		res.send({ done: 'Imagem deletada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao excluir a imagem.' });
	}
};

module.exports = {
	index,
	files,
	getFiles,
	uploadFile,
	deleteFile
};