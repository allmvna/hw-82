import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IAlbum} from "../Albums/sliceAlbums.tsx";


interface ITrack {
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

export const fetchAlbumDetails = createAsyncThunk(
    'tracks/fetchAlbumDetails',
    async (albumName: string) => {
        try {
            const albumResponse = await axiosAPI.get<IAlbum[]>(`/albums?name=${albumName}`);

            if (albumResponse.data.length === 0) {
                throw new Error('Album not found');
            }


            const album = albumResponse.data.find((item) => item.name === albumName);

            if (!album) {
                throw new Error('Selected album not found');
            }

            const response = await axiosAPI.get(`/albums/${album._id}`);

            return {
                artistName: response.data.artist.name,
                albumName: response.data.name,
            };
        } catch (error) {
            console.error('Error fetching album details:', error);
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
            });
    },
});

export const tracksReducer = sliceTracks.reducer;