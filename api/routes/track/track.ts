import express from "express";
import Track from "../../models/Track/Track";
import Album from "../../models/Album/Album";
import auth, {RequestWithUser} from "../../middleware/auth";
import permit from "../../middleware/permit";

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

            const tracks = await Track.find({ album: albumDoc._id })
                .populate('album')
                .sort({ trackNumber: 1 });

            res.json(tracks);
            return;
        }

        const tracks = await Track.find()
            .populate('album')
            .sort({ trackNumber: 1 });

        res.json(tracks);
        return;

    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Error fetching tracks' });
    }
});

trackRouter.post('/', auth, async (req, res) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

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

trackRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const trackId = req.params.id;

        const track = await Track.findByIdAndDelete(trackId);

        if (!track) {
            res.status(404).json({ error: 'Track not found' });
            return;
        }

        res.status(200).json({ message: 'Track deleted successfully' });
        return;
    } catch (error) {
        res.status(500).json({ error: 'Error deleting track' });
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const trackId = req.params.id;
        const track = await Track.findById(trackId);

        if (!track) {
            res.status(404).json({ error: 'Track not found' });
            return;
        }

        track.isPublished = !track.isPublished;
        await track.save();

        res.status(200).json({ message: `Track ${track.isPublished ? 'true' : 'false'}`, track });
    } catch (error) {
        res.status(500).json({ error: 'Error toggling track publication' });
    }
});

export default trackRouter;
