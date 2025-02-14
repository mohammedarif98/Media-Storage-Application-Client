import { configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


import userReducer from './slices/userSlice' 


const userConfig = {
    key: 'user',
    storage,
};


const persistedUserReducer = persistReducer(userConfig, userReducer);



const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
    }),
})



const persistedStore = persistStore(store);
export { store, persistedStore };