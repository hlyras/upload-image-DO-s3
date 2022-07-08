function drawImages(files) {
	let preview_box = document.getElementById("preview-box");
	preview_box.innerHTML = "";

	if(!files.length) {
		preview_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold center" }, "Não foi encontrada nenhuma imagem."));
	}

	for(let i in files) {
		if(files[i].url){

			let image_div = lib.element.create("div", {
				class: 'ground height-150 width-150 border shadow-hover noselect margin-left-10 relative',
				style: 'display: inline-block;vertical-align:top;'
			});

			image_div.append(lib.element.create("img", {
				src: `${files[i].url}`,
				class: 'product-image image-fit noselect'
			}));

			image_div.append(lib.element.create("img", {
				onclick: `deleteImageFromSpaces('${files[i].keycode}')`,
				class: "width-50 height-50 remove-icon opacity-out-05 center pointer",
				src: "https://spaces.jariomilitar.com/erp-images/icon/junk.png"
			}));

			preview_box.append(image_div);
		}
	};
};

async function deleteImageFromSpaces(keycode) {
	let response = await API.response(Image.delete, keycode);
	if(!response) { return false; }

	list();
};

async function list() {
	let images = await API.response(Image.list);
	if(!images) { return false; }

	drawImages(images);
};