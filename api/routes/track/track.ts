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
    const { name, album, duration } = req.body;

    if (!name || !album) {
        res.status(400).json({ error: "Name and album are required" });
    }

    const newTrack = new Track({
        name,
        album,
        duration
    });
    await newTrack.save();
    res.status(201).json(newTrack);
});

export default trackRouter;
