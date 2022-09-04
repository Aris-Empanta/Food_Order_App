import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./slice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

/*  We make the below configurations for redux persist, 
  so that the shopping cart remains on page refresh.*/
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: [thunk]
})

export const persistor = persistStore(store)