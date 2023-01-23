import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const store = configureStore({
   reducer: {
      game: persistReducer({ key: 'game_state', storage }, gameReducer),
   },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
