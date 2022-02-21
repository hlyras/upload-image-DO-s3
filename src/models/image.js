const db = require('../config/connection');

const Image = function(url){
	this.id = 0;
	this.url = url;

	this.save = () => {
		let query = "INSERT INTO cms_wt_dospaces.image (url) VALUES ('"+this.url+"');";
    	return db(query);
	};
};

Image.list = () => {
	let query = "SELECT * FROM cms_wt_dospaces.image;";
	return db(query);
};

module.exports = Image;