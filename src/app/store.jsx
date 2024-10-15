import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer, middlewares } from "./rootReducer";
// import { rootReducer, middlewares } from "./Rootreducer";

const persistConfig = {
  key: "root", // The key for the persisted state in localStorage
  storage, // Using localStorage as the storage engine
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability checks for redux-persist
    }).concat(middlewares),
});

export const persistor = persistStore(store);

export const RootState = store.getState();
