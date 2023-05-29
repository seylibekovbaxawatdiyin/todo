import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './reducer/register.slice'
import loginReducer from './reducer/login.slice'
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
import todoReducer from '../redux/TodoSlice'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

export const store = configureStore({
	reducer: {
		register: registerReducer,
		login: loginReducer,
		todos: persistedReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: true,
})

export let persistor = persistStore(store)
