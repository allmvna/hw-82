import mongoose from "mongoose";
import {ITrack} from "../../types";

const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: {
        type: String
    },
    trackNumber: {
        type: Number,
        required: true
    },
});

const Track = mongoose.model<ITrack>('Track', trackSchema);
export default Track;
