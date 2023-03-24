const Album = require("../models/Album");

const getAlbums = async (req, res) => {
    const albums = await Album.find({});
    res.status(200).json({ success: true, data: albums });
};

const createAlbum = async (req, res) => {
    const { artist, title, year, genre, tracks} = req.body;
    if (!artist || !title || !year  || !tracks ) {
        return res
            .status(400)
            .json({ succes: false, msg: " Artist, title, year and tracks fields required!" });
    }

    try {
        const newAlbum = new Album({
            artist,
            title,
            year,
            genre,
            tracks
        });
        await newAlbum.save();

        res.status(201).json({ success: true, data: newAlbum });
    } catch (error) {
        console.log(error)
    }    
};

const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
        return res
            .status(404)
            .json({ success: false, msg: `No album found with id ${id}` });
    }
    await Album.findByIdAndRemove(id);
    return res.status(200).json({ success: true });
};


module.exports = {
    getAlbums,
    createAlbum,
    deleteAlbum
};
