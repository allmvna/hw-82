import express from 'express';
import User from '../../models/User/User';
import TrackHistory from "../../models/TrackHistory/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).send({ error: 'Authorization token missing' });
            return;
        }

        const user = await User.findOne({ token });

        if (!user) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }

        const { track } = req.body;

        if (!track) {
            res.status(400).send({ error: 'Track ID is required' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track,
            datetime: new Date(),
        });

        await trackHistory.save();

        res.send(trackHistory);
    } catch (error) {
        next(error);
    }
});

export default trackHistoryRouter;
