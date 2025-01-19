import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/sliceArtists.ts";
import {albumsReducer} from "../features/Albums/sliceAlbums.ts";
import {tracksReducer} from "../features/Tracks/sliceTracks.ts";
import {registerReducer} from "../features/Users/sliceRegister.ts";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
