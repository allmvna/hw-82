import express from "express";
import Artist from "../../models/Artist/Artist";
import {imagesUpload} from "../../multer";
import auth, {RequestWithUser} from "../../middleware/auth";
import permit from "../../middleware/permit";

const artistRouter = express.Router();

artistRouter.post('/new_artist', auth, imagesUpload.single('photo'), async (req, res) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const { name, information } = req.body;

        if (!name) {
            res.status(400).json({ message: "Name is required" })
            return;
        }

        const newArtist = new Artist({
            name,
            photo: req.file ? '/images' + req.file.filename : null,
            information
        });

        await newArtist.save();
        res.status(201).json(newArtist);
    } catch (e) {
        res.status(500).json({ message: 'Error creating artist' });
    }
});

artistRouter.get('/', async (req, res) => {
    const artists = await Artist.find();
    res.json(artists);
});

artistRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const artistId = req.params.id;

        const artist = await Artist.findByIdAndDelete(artistId);

        if (!artist) {
            res.status(404).json({ error: 'Artist not found' });
            return;
        }

        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting artist' });
    }
});

artistRouter.patch('/artists/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);

        if (!artist) {
            res.status(404).json({ error: 'Artist not found' });
            return;
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        res.status(200).json({ message: `Artist ${artist.isPublished ? 'true' : 'false'}`, artist });
    } catch (error) {
        res.status(500).json({ error: 'Error toggling artist publication' });
    }
});

export default artistRouter;
