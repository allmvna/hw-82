import express from "express";
import Album from "../../models/Album/Album";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res) => {
    try {
        const { artist } = req.query;
        const query = artist ? { artist } : {};
        const albums = await Album.find(query).populate('artist');

        res.json(albums);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching albums'});
    }
});


albumRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if (!album) {
            res.status(404).json({ error: 'Album not found' });
        }

        res.json(album);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching album' });
    }
});

albumRouter.post('/', async (req, res) => {
    try {
        const { name, artist, releaseYear, coverImage } = req.body;

        if (!name || !artist || !releaseYear) {
            res.status(400).json({ error: "Name, artist, and release year are required" });
        }

        const newAlbum = new Album({
            name,
            artist,
            releaseYear,
            coverImage
        });
        await newAlbum.save();

        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(500).json({ error: 'Error creating album' });
    }
});

export default albumRouter;
