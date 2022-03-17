const Image = require('../models/image');
const { uploadFileS3 } = require("../lib/s3");
const { compressImage } = require("../lib/sharp");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);


const renderIndex = (req, res) => {
	res.render('upload', {
		title: "Upload Image"
	});
};

const uploadFile = async (req, res) => {
	console.log(req.files);

	req.files.forEach(file => {
		compressImage(file, 500)
            .then(async newPath => {
				await uploadFileS3(newPath, file.filename.split('.')[0] + '.webp');
				await unlinkFile(newPath);
				await unlinkFile(file.path);
             })
            .catch(err => console.log(err) );
	})

	res.send("ok");
};

module.exports = {
	renderIndex,
	uploadFile
}