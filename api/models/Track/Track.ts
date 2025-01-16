import mongoose from "mongoose";

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

const Track = mongoose.model('Track', trackSchema);
export default Track;
