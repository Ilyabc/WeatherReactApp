import { combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { cityReducer } from './cityReducer';
import storage from 'redux-persist/lib/storage';
import { 
	persistStore, 
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
	cities : cityReducer, 
})
const persistConfig = {
	key: 'root',
	storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
}) 

export const persistor = persistStore(store)

export default store;