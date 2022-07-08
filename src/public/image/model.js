const Image = {};

Image.upload = async (data) => {
	let response = await fetch("/upload", {
		method: "POST",
	  body: data
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};

Image.list = async () => {
	let response = await fetch("/list");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false; };
	
	return response;
};

Image.delete = async (keycode) => {
	let response = await fetch("/delete", {
		method: "DELETE",
		headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({keycode})
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};