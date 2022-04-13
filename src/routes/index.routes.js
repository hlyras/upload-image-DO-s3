const router = require("express").Router();

const multer = require('../lib/multer');

const { renderIndex, getFiles, uploadFile, deleteFile } = require("../controllers/index.controllers");

router.get("/", renderIndex);
router.get("/files", getFiles);
router.post("/upload", multer.any('files'), uploadFile);
router.post("/delete", deleteFile);

module.exports = router;