const router = require("express").Router();

const multer = require('../lib/multer');
// const sharp = require('../lib/sharp');

const { renderIndex, uploadFile } = require("../controllers/index.controllers");
// const { upload } = require("../lib/multer");

// const multer = require("multer");
// const upload = multer({ dest: 'uploads/' });

// const upload = multer({ storage: storage })

router.get("/", renderIndex);
// router.get("/files", getFiles);
router.post("/upload", multer.single('file'), uploadFile);

module.exports = router;