import mongoose from 'mongoose';
import {ITrackHistory} from "../../types";

const Schema = mongoose.Schema;

const trackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    dateListened: {
        type: Date,
        required: true,
        default: Date.now,
    },
});


const TrackHistory = mongoose.model<ITrackHistory>('TrackHistory', trackHistorySchema);
export default TrackHistory;
