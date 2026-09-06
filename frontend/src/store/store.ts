import rootReducer from '@/src/store/root-reducer'
import IAuthInitalState from '@/src/store/auth/auth.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { Platform } from 'react-native'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PersistConfig,
	createTransform,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'

const resetTransientAuthState = createTransform<
	IAuthInitalState,
	IAuthInitalState
>(
	state => ({ ...state, isLoading: false, error: null }),
	state => ({ ...state, isLoading: false, error: null }),
	{ whitelist: ['auth'] }
)

const serverStorage = {
	getItem: (_key: string) => Promise.resolve(null),
	setItem: (_key: string, value: string) => Promise.resolve(value),
	removeItem: (_key: string) => Promise.resolve()
}

const storage =
	Platform.OS === 'web' && typeof window === 'undefined'
		? serverStorage
		: AsyncStorage

const persistCOnfig: PersistConfig<ReturnType<typeof rootReducer>> = {
	key: 'root',
	storage,
	whitelist: ['auth'],
	transforms: [resetTransientAuthState]
}

const persistedReducer = persistReducer(persistCOnfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
