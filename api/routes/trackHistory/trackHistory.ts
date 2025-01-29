import express from 'express';
import TrackHistory from "../../models/TrackHistory/TrackHistory";
import auth, {RequestWithUser} from "../../middleware/auth";
import Track from "../../models/Track/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    try {

        const user = expressReq.user;

        if (!user) {
            res.status(401).send({ error: "User not authenticated" });
            return;
        }

        const { track } = req.body;


        if (!track) {
            res.status(400).send({ error: 'Track ID is required' });
            return;
        }

        const trackDoc = await Track.findById(track);
        if (!trackDoc) {
            res.status(404).send({ error: 'Track not found' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track,
            datetime: new Date(),
        });

        await trackHistory.save();

        res.status(201).send(trackHistory);
    } catch (error) {
        next(error);
    }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    try {
        const user = expressReq.user;

        if (!user) {
            res.status(401).send({ error: "User not authenticated" });
            return;
        }

        const trackHistories = await TrackHistory.find({ user: user._id })
            .populate('track', 'name artist')
            .select('datetime track')
            .sort({ datetime: -1 });

        if (!trackHistories.length) {
            res.status(404).send({ error: 'No track history found' });
            return;
        }

        res.status(200).send(trackHistories);
    } catch (error) {
        next(error);
    }
});




export default trackHistoryRouter;
