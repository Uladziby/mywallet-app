import axios from 'axios'
import { Platform } from 'react-native'
import { getTokenFromStorage } from '@/src/services/auth/auth.helper'

const API_URL = Platform.select({
	android: process.env.EXPO_PUBLIC_SERVER_URL,
	ios: process.env.EXPO_PUBLIC_SERVER_URL_WEB,
	web: process.env.EXPO_PUBLIC_SERVER_URL_WEB,
	default: process.env.EXPO_PUBLIC_SERVER_URL
})

export const getContentType = () => ({
	'Content-Type': 'application/json'
})

const instance = axios.create({
	baseURL: API_URL,
	timeout: 15000,
	headers: getContentType()
})

instance.interceptors.request.use(async config => {
	const accessToken = await getTokenFromStorage()
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

export default instance
