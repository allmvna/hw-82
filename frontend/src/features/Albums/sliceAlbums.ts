import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, fetchAlbums} from "./thunkAlbums.ts";
import {RootState} from "../../app/store.ts";


export interface IAlbum {
    _id: string,
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

export const selectLoadingAlbum = (state: RootState) =>
    state.albums.isLoading;


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
            })
            .addCase(createAlbum.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(createAlbum.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albums.push(action.payload);
            })
            .addCase(createAlbum.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const albumsReducer = sliceAlbums.reducer;


