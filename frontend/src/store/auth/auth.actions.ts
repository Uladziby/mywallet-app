import { IAuthResponse } from '../../services/auth/auth-service.interface'
import { AuthService } from '@/src/services/auth/auth.service'
import { IAuthFormData } from '@/src/types/auth.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

type AuthErrorPayload = {
	message: string
	status?: number
	details?: unknown
}

const getErrorMessage = (data: unknown) => {
	if (!data || typeof data !== 'object' || !('message' in data)) return undefined

	const message = (data as { message?: unknown }).message

	if (Array.isArray(message)) return message.join(', ')
	if (typeof message === 'string') return message

	return undefined
}

const getAuthErrorPayload = (error: unknown): AuthErrorPayload => {
	if (isAxiosError(error)) {
		if (error.code === 'ECONNABORTED' || !error.response) {
			return {
				message: 'Cannot connect to the server. Please try again.',
				status: error.response?.status
			}
		}

		return {
			message:
				getErrorMessage(error.response?.data) ||
				error.message ||
				'Network error',
			status: error.response?.status,
			details: error.response?.data
		}
	}

	if (error instanceof Error) return { message: error.message }

	return { message: 'Network error' }
}

export const register = createAsyncThunk<
	IAuthResponse,
	IAuthFormData,
	{ rejectValue: AuthErrorPayload }
>(
	'auth/register',
	async ({ password, email }, thunkAPI) => {
		try {
			return await AuthService.register(email, password)
		} catch (error) {
			return thunkAPI.rejectWithValue(getAuthErrorPayload(error))
		}
	}
)

export const login = createAsyncThunk<
	IAuthResponse,
	IAuthFormData,
	{ rejectValue: AuthErrorPayload }
>(
	'auth/login',
	async ({ password, email }, thunkAPI) => {
		try {
			return await AuthService.login(email, password)
		} catch (error) {
			return thunkAPI.rejectWithValue(getAuthErrorPayload(error))
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
	return {}
})
