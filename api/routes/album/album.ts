import express from "express";
import Album from "../../models/Album/Album";
import Artist from "../../models/Artist/Artist";
import mongoose from 'mongoose';

const albumRouter = express.Router();

interface Query {
    artist?: string;
}

albumRouter.get('/', async (req, res) => {
    try {
        const { artist } = req.query as Query;
        let query: { artist?: mongoose.Types.ObjectId } = {};
        if (artist) {
            const artistDoc = await Artist.findOne({ name: artist });
            if (artistDoc) {
                query.artist = artistDoc._id;
            } else {
                res.status(404).json({ error: 'Artist not found' });
                return;
            }
        }
        const albums = await Album.find(query)
            .populate('artist')
            .sort({ year: -1 });

        res.json(albums);
    } catch (error) {
        console.error('Error fetching albums:', error);
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
            return;
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
