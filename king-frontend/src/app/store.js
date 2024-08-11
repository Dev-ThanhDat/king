import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountReducer from '~/app/account/slice';
import ToggleSidebarSlice from '~/app/ToggleSidebar/ToggleSidebarSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isLogged']
};

const persistedAuthReducer = persistReducer(authPersistConfig, accountReducer);

const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    ToggleSidebarReducer: ToggleSidebarSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export default store;
