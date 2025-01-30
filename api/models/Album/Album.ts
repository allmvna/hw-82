import mongoose from "mongoose";
import {IAlbum} from "../../types";

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
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Album = mongoose.model<IAlbum>('Album', albumSchema);
export default Album;