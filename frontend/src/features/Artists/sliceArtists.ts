import {createSlice} from "@reduxjs/toolkit";
import {createArtist, deleteArtist, fetchArtists, toggleArtistPublished} from "./thunkArtists.ts";
import {RootState} from "../../app/store.ts";


export interface IArtist {
    _id: string;
    name: string;
    photo: string;
    information: string;
    isPublished: boolean;
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
    state.artists.artists;
export const selectLoadingArtist = (state: RootState) =>
    state.artists.isLoading;
export const selectErrorArtist = (state: RootState) =>
    state.artists.error;

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
            })
            .addCase(deleteArtist.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteArtist.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedArtistId = action.payload;
                state.artists = state.artists.filter(artist => artist._id !== deletedArtistId);
            })
            .addCase(deleteArtist.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(toggleArtistPublished.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(toggleArtistPublished.fulfilled, (state, action) => {
                state.isLoading = false;

                const artistId = action.payload.artist._id;
                const updatedArtist = action.payload.artist;
                const index = state.artists.findIndex(artist => artist._id === artistId);
                if (index !== -1) {
                    state.artists[index] = updatedArtist;
                }
            })
            .addCase(toggleArtistPublished.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const artistsReducer = sliceArtists.reducer;


