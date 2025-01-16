import express from "express";
import Track from "../../models/Track/Track";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    const { album } = req.query;
    const query = album ? { album } : {};
    const tracks = await Track.find(query).populate('album');
    res.json(tracks);
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
