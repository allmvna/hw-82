import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        default: null
    },
});

const Album = mongoose.model('Album', albumSchema);
export default Album;