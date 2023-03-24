const express = require("express");
const router = express.Router();

const {
    getAlbums,
    createAlbum,
    deleteAlbum,
} = require("../controllers/albums");

router.get("/", getAlbums);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;
