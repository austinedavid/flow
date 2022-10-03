import { configureStore, combineReducers} from '@reduxjs/toolkit'
import themeReducer from '../Slice/ThemeSlice'
import profileReducer from '../Slice/ProfileSlice'
import userReducer from '../Slice/UserSlice'
import videoReducer from '../Slice/VideoSlice'
import pictureReducer from '../Slice/PictureSlice'
import adventureReducer from '../Slice/AdventureSlice'


import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
 } from 'redux-persist'
 import storage from 'redux-persist/lib/storage'
 

 const persistConfig = {
   key: 'root',
   version: 1,
   storage,
 }

 const rootReducer = combineReducers({user: userReducer,
   settheme: themeReducer, 
   profileshow: profileReducer,
   video: videoReducer,
   picture: pictureReducer,
   adventure: adventureReducer,
   
  })
 const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   
})

export const persistor = persistStore(store)

