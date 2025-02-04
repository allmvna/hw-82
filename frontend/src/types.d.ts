import {ITrack} from "./features/Tracks/sliceTracks.ts";

export interface UserFields {
    _id: string;
    username: string;
    token: string;
    role: string;
    displayName: string;
    avatar: File | null;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface TrackHistoryItem {
    _id: string;
    track: ITrack,
    trackName: string;
    artistName: string;
    dateListened: string;
}

export interface IArtist {
    name: string;
}

export interface IAlbum {
    name: string;
    artist: IArtist;
    releaseYear: number;
    coverImage: string | null;
}

export interface ITrack {
    name: string;
    album: IAlbum;
    duration: string;
    trackNumber: number;
}


