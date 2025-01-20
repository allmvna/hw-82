import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from "../../axiosAPI.ts";
import {ITrack} from "./sliceTracks.ts";
import {User} from "../../types";
import {RootState} from "../../app/store.ts";

interface TrackHistoryItem {
    track: ITrack,
    user: User,
    datetime: string,
}

interface TrackHistoryState {
    history: TrackHistoryItem[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TrackHistoryState = {
    history: [],
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
                state.history.push(action.payload);
            })
            .addCase(addTrackToHistory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const trackHistoryReducer = sliceTrackHistory.reducer;
