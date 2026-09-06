import { IAuthResponse } from '@/src/services/auth/auth-service.interface'
import {
	removeTokenFromStorage,
	saveTokenToStorage
} from '@/src/services/auth/auth.helper'
import instance from '../api/interceptors'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/login', {
			email,
			password
		})

		if (response.data.accessToken)
			await saveTokenToStorage(response.data.accessToken)

		return response.data
	},

	async register(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/register', {
			email,
			password
		})

		if (response.data.accessToken)
			await saveTokenToStorage(response.data.accessToken)

		return response.data
	},

	async logout() {
		await removeTokenFromStorage()
	}
}
