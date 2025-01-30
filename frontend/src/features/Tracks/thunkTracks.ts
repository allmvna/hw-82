import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IAlbum} from "../Albums/sliceAlbums.ts";

export const fetchTracks = createAsyncThunk(
    'tracks/fetchTracks',
    async (albumName: string) => {
        try {
            const response = await axiosAPI.get(`/tracks?album=${albumName}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching album and tracks:', error);
            throw error;
        }
    }
);

export const fetchAlbumDetails = createAsyncThunk(
    'tracks/fetchAlbumDetails',
    async (albumName: string) => {
        try {
            const albumResponse = await axiosAPI.get<IAlbum[]>(`/albums?name=${albumName}`);

            if (albumResponse.data.length === 0) {
                throw new Error('Album not found');
            }


            const album = albumResponse.data.find((item) => item.name === albumName);

            if (!album) {
                throw new Error('Selected album not found');
            }

            const response = await axiosAPI.get(`/albums/${album._id}`);

            return {
                artistName: response.data.artist.name,
                albumName: response.data.name,
            };
        } catch (error) {
            console.error('Error fetching album details:', error);
            throw error;
        }
    }
);

export const createTrack = createAsyncThunk(
    'tracks/createTrack',
    async (trackData: { name: string, album: string, duration: string, trackNumber: number }) => {
        try {
            const response = await axiosAPI.post('/tracks/new_track', trackData);
            return response.data;
        } catch (error) {
            console.error('Error creating track:', error);
            throw error;
        }
    }
);