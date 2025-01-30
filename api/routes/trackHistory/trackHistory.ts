import express from 'express';
import TrackHistory from "../../models/TrackHistory/TrackHistory";
import auth, {RequestWithUser} from "../../middleware/auth";
import Track from "../../models/Track/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const { track } = req.body;

    if (!track) {
        res.status(400).send({ error: 'Track ID is required' });
        return;
    }

    try {
        const trackDoc = await Track.findById(track);

        if (!trackDoc) {
            res.status(404).send({ error: 'Track not found' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: trackDoc,
            dateListened: new Date(),
        });

        await trackHistory.save();
        res.status(201).send(trackHistory);
    } catch (error) {
        next(error);
    }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const trackHistory = await TrackHistory.find({ user: user._id })
            .populate({
                path: 'track',
                select: 'name album',
                populate: {
                    path: 'album',
                    select: 'name artist',
                    populate: {
                        path: 'artist',
                        select: 'name',
                    },
                },
            })
            .sort({ dateListened: -1 });

        const formattedHistory = trackHistory.map((item) => ({
            trackName: item.track.name,
            artistName: item.track.album.artist.name,
            dateListened: item.dateListened,
        }));

        res.send(formattedHistory);
    } catch (error) {
        next(error);
    }
});




export default trackHistoryRouter;
