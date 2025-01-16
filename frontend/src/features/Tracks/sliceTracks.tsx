import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";


interface ITrack {
    name: string;
    duration: string;
    trackNumber: number;
    album: string;
}

interface TracksState {
    tracks: ITrack[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TracksState = {
    tracks: [],
    isLoading: false,
    error: false,
};

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

export const sliceTracks = createSlice({
    name: "track",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tracks = action.payload || [];
            })
            .addCase(fetchTracks.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const tracksReducer = sliceTracks.reducer;