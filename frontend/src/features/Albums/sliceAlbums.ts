import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, deleteAlbum, fetchAlbums, fetchAllAlbums, toggleAlbumPublished} from "./thunkAlbums.ts";
import {RootState} from "../../app/store.ts";


export interface IAlbum {
    _id: string,
    name: string;
    artist: string;
    coverImage: string | null;
    releaseYear: number;
    isPublished: boolean;
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

export const selectAlbumByArtist = (state: RootState) => state.albums.albums;
export const selectALlAlbums = (state: RootState) => state.albums.albums;
export const selectLoadingAlbum = (state: RootState) =>
    state.albums.isLoading;
export const selectErrorAlbum = (state: RootState) =>
    state.albums.error;


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
            .addCase(fetchAllAlbums.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchAllAlbums.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albums = action.payload;
            })
            .addCase(fetchAllAlbums.rejected, (state) => {
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
            })
            .addCase(deleteAlbum.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedAlbumId = action.payload;
                state.albums = state.albums.filter(album => album._id !== deletedAlbumId);
            })
            .addCase(deleteAlbum.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(toggleAlbumPublished.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(toggleAlbumPublished.fulfilled, (state, action) => {
                state.isLoading = false;

                const albumId = action.payload.album._id;
                const updatedAlbum = action.payload.album;
                const index = state.albums.findIndex(album => album._id === albumId);
                if (index !== -1) {
                    state.albums[index] = updatedAlbum;
                }
            })
            .addCase(toggleAlbumPublished.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const albumsReducer = sliceAlbums.reducer;


