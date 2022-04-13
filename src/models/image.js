const db = require('../config/connection');

const Image = function(){
	this.id = 0;
	this.etag;
	this.url;
	this.keycode;

	this.save = () => {
		let query = `INSERT INTO spaces.image (etag, url, keycode) VALUES ('${this.etag}','${this.url}','${this.keycode}');`;
    	return db(query);
	};
};

Image.list = () => {
	let query = "SELECT * FROM spaces.image;";
	return db(query);
};

Image.delete = (keycode) => {
	let query = "DELETE FROM spaces.image WHERE keycode='"+keycode+"';";
	return db(query);
};

module.exports = Image;