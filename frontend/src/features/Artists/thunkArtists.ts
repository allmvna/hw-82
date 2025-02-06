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
            const response = await axiosAPI.post('/artists/new_artist', formData);
            return response.data;
        } catch (error) {
            console.error('Error creating artist:', error);
            throw error;
        }
    }
);

export const deleteArtist = createAsyncThunk(
    'artists/deleteArtist',
    async (id: string) => {
        try {
            const response = await axiosAPI.delete(`/artists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting artist:', error);
            throw error;
        }
    }
);