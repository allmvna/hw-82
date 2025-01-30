import { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface IArtist extends Document {
    name: string;
    photo: string;
    information: string;
}

export interface IAlbum extends Document {
    name: string;
    artist: IArtist;
    releaseYear: number;
    coverImage: string | null;
}

export interface ITrack extends Document {
    name: string;
    album: IAlbum;
    duration: string;
    trackNumber: number;
}

export interface ITrackHistory extends Document {
    user: mongoose.Types.ObjectId;
    track: ITrack;
    dateListened: Date;
}