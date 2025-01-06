import mongoose from "mongoose";

const Schema  = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    information: {
        type: String,
    }
});

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;