const router = require("express").Router();

const multer = require('../lib/multer');

const { index, files, getFiles, uploadFile, deleteFile } = require("../controllers/index.controllers");

router.get("/", index);
router.get("/files", files);
router.get("/list", getFiles);
router.post("/upload", multer.any('files'), uploadFile);
router.delete("/delete", deleteFile);

module.exports = router;