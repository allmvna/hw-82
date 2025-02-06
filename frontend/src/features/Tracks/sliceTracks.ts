import {createSlice} from "@reduxjs/toolkit";
import {createTrack, deleteTrack, fetchAlbumDetails, fetchTracks, toggleTrackPublished} from "./thunkTracks.ts";
import {RootState} from "../../app/store.ts";


export interface ITrack {
    _id: string;
    trackId: string;
    name: string;
    duration: string;
    trackNumber: number;
    album: string;
    isPublished: boolean;
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
            })
            .addCase(deleteTrack.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteTrack.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedTrackId = action.payload;
                state.tracks = state.tracks.filter(track => track._id !== deletedTrackId);
            })
            .addCase(deleteTrack.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(toggleTrackPublished.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(toggleTrackPublished.fulfilled, (state, action) => {
                state.isLoading = false;

                const trackId = action.payload.track._id;
                const updatedTracks = action.payload.track;
                const index = state.tracks.findIndex(track => track._id === trackId);
                if (index !== -1) {
                    state.tracks[index] = updatedTracks;
                }
            })
            .addCase(toggleTrackPublished.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const tracksReducer = sliceTracks.reducer;