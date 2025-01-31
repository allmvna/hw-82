import {createSlice} from "@reduxjs/toolkit";
import {createTrack, fetchAlbumDetails, fetchTracks} from "./thunkTracks.ts";
import {RootState} from "../../app/store.ts";


export interface ITrack {
    _id: string;
    trackId: string;
    name: string;
    duration: string;
    trackNumber: number;
    album: string;
}

interface IAlbumInfo {
    artistName: string;
    albumName: string;
}


interface TracksState {
    tracks: ITrack[];
    albumInfo: IAlbumInfo | null;
    isLoading: boolean;
    error: boolean;
}

const initialState: TracksState = {
    tracks: [],
    albumInfo: null,
    isLoading: false,
    error: false,
};

export const selectAlbumInfo = (state: RootState) => state.tracks.albumInfo;
export const selectTrack = (state: RootState) =>
    state.tracks.tracks;
export const selectLoadingTracks = (state: RootState) =>
    state.tracks.isLoading;
export const selectErrorTracks = (state: RootState) =>
    state.tracks.error;

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
            })
            .addCase(fetchAlbumDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAlbumDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albumInfo = action.payload;
            })
            .addCase(fetchAlbumDetails.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(createTrack.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTrack.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tracks.push(action.payload);
            })
            .addCase(createTrack.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const tracksReducer = sliceTracks.reducer;