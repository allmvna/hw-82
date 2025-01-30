import {createSlice} from "@reduxjs/toolkit";
import {createArtist, fetchArtists} from "./thunkArtists.ts";
import {RootState} from "../../app/store.ts";


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

export const selectArtist = (state: RootState) =>
    state.artists.isLoading;

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
            })
            .addCase(createArtist.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(createArtist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artists.push(action.payload);
            })
            .addCase(createArtist.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const artistsReducer = sliceArtists.reducer;


