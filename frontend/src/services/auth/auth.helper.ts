import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'accessToken'

export const getTokenFromStorage = async () => {
	return getItemAsync(ACCESS_TOKEN_KEY)
}

export const saveTokenToStorage = async (accessToken: string) => {
	await setItemAsync(ACCESS_TOKEN_KEY, accessToken)
}

export const removeTokenFromStorage = async () => {
	await deleteItemAsync(ACCESS_TOKEN_KEY)
}
