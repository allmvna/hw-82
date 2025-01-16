import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";


export interface IAlbum {
    name: string;
    artist: string;
    coverImage: string | null;
    releaseYear: number;
}

interface AlbumsState {
    albums: IAlbum[],
    isLoading: boolean,
    error: boolean,
}

const initialState: AlbumsState = {
    albums: [],
    isLoading: false,
    error: false,
};


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

export const sliceAlbums = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albums = action.payload;
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const albumsReducer = sliceAlbums.reducer;


