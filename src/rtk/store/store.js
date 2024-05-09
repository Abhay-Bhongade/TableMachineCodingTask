import { combineReducers,configureStore } from "@reduxjs/toolkit";
import {persistReducer,PURGE,PERSIST,REGISTER,FLUSH,REHYDRATE,PAUSE} from "redux-persist";
import storage from "redux-persist/lib/storage"
import tableSlice from "../features/tableSlice";

const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    tableSlice:tableSlice,
});

const persistedReducer = persistReducer(persistConfig,reducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[PURGE,PERSIST,REGISTER,FLUSH,REHYDRATE,PAUSE]
        }
    })
})