import express from "express";
import Artist from "../../models/Artist/Artist";
import {imagesUpload} from "../../multer";

const artistRouter = express.Router();

artistRouter.post('/', imagesUpload.single('photo'), async (req, res) => {
    try {
        const { name, information } = req.body;
        const photo = req.file ? req.file.filename : null;

        if (!name) {
            res.status(400).json({ message: "Name is required" })
            return;
        }

        const newArtist = new Artist({
            name,
            photo,
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

export default artistRouter;
