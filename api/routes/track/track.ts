import express from "express";
import Track from "../../models/Track/Track";
import Album from "../../models/Album/Album";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    try {
        const { album } = req.query as { album?: string };

        if (album) {
            const albumDoc = await Album.findOne({ name: album });

            if (!albumDoc) {
                res.status(404).json({ error: 'Album not found' });
            return;
            }

            const tracks = await Track.find({ album: albumDoc._id }).populate('album');
            res.json(tracks);
            return;
        }

        const tracks = await Track.find().populate('album');
        res.json(tracks);
        return;

    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Error fetching tracks' });
    }
});

trackRouter.post('/', async (req, res) => {
    const { name, album, duration, trackNumber } = req.body;

    if (!name || !album || !trackNumber) {
        res.status(400).json({ error: "Name, album and trackNumber are required" });
    }

    const newTrack = new Track({
        name,
        album,
        duration,
        trackNumber
    });
    await newTrack.save();
    res.status(201).json(newTrack);
});

export default trackRouter;
