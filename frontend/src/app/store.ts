import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/sliceArtists.tsx";
import {albumsReducer} from "../features/Albums/sliceAlbums.tsx";
import {tracksReducer} from "../features/Tracks/sliceTracks.tsx";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
