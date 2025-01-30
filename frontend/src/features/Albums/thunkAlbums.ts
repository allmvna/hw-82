import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAlbums',
    async (artistName: string) => {
        try {
            const response = await axiosAPI.get(`/albums?artist=${artistName}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching albums:', error);
            throw error;
        }
    }
);

export const createAlbum = createAsyncThunk(
    'albums/createAlbum',
    async (formData: FormData) => {
        try {
            const response = await axiosAPI.post('/albums/new_album', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating album:', error);
            throw error;
        }
    }
);