import { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface IArtist extends Document {
    name: string;
    photo: string;
    information: string;
    isPublished: boolean;
}

export interface IAlbum extends Document {
    name: string;
    artist: IArtist;
    releaseYear: number;
    coverImage: string | null;
    isPublished: boolean;
}

export interface ITrack extends Document {
    name: string;
    album: IAlbum;
    duration: string;
    trackNumber: number;
    isPublished: boolean;
}

export interface ITrackHistory extends Document {
    user: mongoose.Types.ObjectId;
    track: ITrack;
    dateListened: Date;
}