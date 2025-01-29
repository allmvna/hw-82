import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";


export interface IArtist {
    _id: string;
    name: string;
    photo: string;
    information: string
}

interface ArtistState{
    artists: IArtist[],
    isLoading: boolean,
    error: boolean,
}

const initialState: ArtistState = {
    artists: [],
    isLoading: false,
    error: false,
};

export const fetchArtists = createAsyncThunk(
    'artists/fetchArtists',
    async () => {
        const response = await axiosAPI.get('/artists');
        return response.data;
    }
);

export const sliceArtists = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artists = action.payload;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const artistsReducer = sliceArtists.reducer;


