const db = require('../config/connection');

const Image = function(){
	this.id = 0;
	this.etag;
	this.url;
	this.key;

	this.save = () => {
		let query = `INSERT INTO spaces.image (etag, url, keycode) VALUES ('${this.etag}','${this.url}','${this.key}');`;
		console.log(query);
    	return db(query);
	};
};

Image.list = () => {
	let query = "SELECT * FROM spaces.image;";
	return db(query);
};

module.exports = Image;