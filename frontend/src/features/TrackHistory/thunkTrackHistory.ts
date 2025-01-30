import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {TrackHistoryItem} from "../../types";


export const addTrackToHistory = createAsyncThunk<
    TrackHistoryItem,
    { track: string; token: string }
>(
    "trackHistory/addTrackToHistory",
    async ({ track, token }) => {
        const response = await axiosAPI.post(
            '/track_history',
            { track },
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

export const fetchTrackHistory = createAsyncThunk(
    "trackHistory/fetchTrackHistory",
    async ({ token }: { token: string }) => {
        if (!token) {
            console.log("Unauthorized: Token is missing");
            return [];
        }

        try {
            const response = await axiosAPI.get('/track_history', {
                headers: { Authorization: token },
            });
            return response.data;
        } catch (error) {
            console.log("Failed to fetch track history", error);
            return [];
        }
    }
);
