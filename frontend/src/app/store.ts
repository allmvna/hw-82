import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/sliceArtists.ts";
import {albumsReducer} from "../features/Albums/sliceAlbums.ts";
import {tracksReducer} from "../features/Tracks/sliceTracks.ts";
import {trackHistoryReducer} from "../features/TrackHistory/sliceTrackHistory.ts";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {usersReducer} from "../features/users/userSlice.ts";


const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
