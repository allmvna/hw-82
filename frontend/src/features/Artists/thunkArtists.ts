import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const fetchArtists = createAsyncThunk(
    'artists/fetchArtists',
    async () => {
        const response = await axiosAPI.get('/artists');
        return response.data;
    }
);


export const createArtist = createAsyncThunk(
    'artists/createArtist',
    async (formData: FormData) => {
        try {
            const response = await axiosAPI.post('/new_artist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error creating artist:', error);
            throw error;
        }
    }
);
