import {createSlice} from '@reduxjs/toolkit';
import {addTrackToHistory, fetchTrackHistory} from "./thunkTrackHistory.ts";
import {TrackHistoryItem} from "../../types";
import {RootState} from "../../app/store.ts";

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

export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.isLoading;
export const selectTrackHistoryLoadingError = (state: RootState) => state.trackHistory.error;

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
                state.trackHistory = [...state.trackHistory, action.payload];
            })
            .addCase(addTrackToHistory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchTrackHistory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchTrackHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trackHistory = action.payload;
            })
            .addCase(fetchTrackHistory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const trackHistoryReducer = sliceTrackHistory.reducer;
