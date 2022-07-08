const file = document.getElementById("files");
let fileStore = [];

function drawImages(files) {
	let preview_box = document.getElementById("preview-box");
	preview_box.innerHTML = "";

	for(let i in files) {
		if(files[i].image){

			let image_div = lib.element.create("div", {
				class: 'ground height-150 width-150 border shadow-hover noselect margin-left-10 relative',
				style: 'display: inline-block;vertical-align:top;'
			});

			image_div.append(lib.element.create("img", {
				src: `${files[i].image}`,
				class: 'product-image image-fit noselect'
			}));

			image_div.append(lib.element.create("img", {
				onclick: `removeFileFromFileList('${files[i].name}')`,
				class: "width-50 height-50 remove-icon opacity-out-05 center pointer",
				src: "https://spaces.jariomilitar.com/erp-images/icon/junk.png"
			}));

			preview_box.append(image_div);
		}
	};
};

function removeFileFromFileList(imgName) {
	const dt = new DataTransfer();
	const input = document.getElementById('files');
	const { files } = input;
	const fileStoreRemove = [];

	for (let i = 0; i < files.length; i++) {
		if (imgName !== files[i].name){
		  dt.items.add(files[i]);
		  fileStoreRemove.push(files[i]);
		}
	};

	fileStore = fileStoreRemove;
	input.files = dt.files;
	drawImages(input.files);
};

function clearFileList() {
	const dt = new DataTransfer();
	const input = document.getElementById('files');
	const { files } = input;

	fileStore = [];
	input.files = dt.files;
	drawImages(input.files);
};

function setFileList(files) {
	const dt = new DataTransfer();
	const input = document.getElementById('files');

	for(let i in files){
		dt.items.add(files[i]);
	};

	input.files = dt.files;
	drawImages(input.files);
};

function getFiles(files){
	let reader = new FileReader();

	function readFile(index) {
		if(index >= files.length) return setFileList(fileStore);

		reader.onload = (e) => {
			files[index].image = e.target.result;

			fileStore.push(files[index]);

			readFile(index + 1);
		};

		reader.readAsDataURL(files[index]);
	};

	readFile(0);
};

function verifyDuplicity(fls, flst) {
	for(let i in fls) {
		for(let j in flst) {
			if(fls[i].name == flst[j].name) {
				setFileList(flst);
				return alert("Não é permitido adicionar arquivos duplicados");
			}
		};
	};
};

file.addEventListener("change", e => {
	let files = e.target.files;

	verifyDuplicity(files, fileStore);

	getFiles(files);
});

document.getElementById("upload-form").addEventListener("submit", async e => {
	e.preventDefault();

	const input = document.getElementById('files');

	let data = new FormData();
	
	// data.append('name', e.target.elements.namedItem('name').value);
	for(let i in input.files) {
		data.append('file', input.files[i]);
	};

	let response = await API.response(Image.upload, data);
	if(!response) { return false; }

	alert(response.done);

	clearFileList();
});