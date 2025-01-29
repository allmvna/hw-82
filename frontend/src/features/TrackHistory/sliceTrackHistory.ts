import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from "../../axiosAPI.ts";
import { RootState } from "../../app/store.ts";
import {ITrack} from "../Tracks/sliceTracks.ts";

interface TrackHistoryItem {
    track: ITrack,
    datetime: string;
}

interface TrackHistoryState {
    trackHistory: TrackHistoryItem[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TrackHistoryState = {
    trackHistory: [],
    isLoading: false,
    error: false,
};

export const addTrackToHistory = createAsyncThunk<
    TrackHistoryItem,
    ITrack,
    { state: RootState }
>(
    "trackHistory/addTrackToHistory",
    async (track, { getState }) => {
        const token = getState().users.user?.token;
        if (!token) {
            throw new Error("User token is missing");
        }
        const response = await axiosAPI.post<TrackHistoryItem>(
            '/track_history',
            { track },
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

const sliceTrackHistory = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTrackToHistory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addTrackToHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trackHistory.push(action.payload);
            })
            .addCase(addTrackToHistory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const trackHistoryReducer = sliceTrackHistory.reducer;
