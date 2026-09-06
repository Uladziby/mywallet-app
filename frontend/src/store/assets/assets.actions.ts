import { IRequestPostAsset } from '@/src/components/screens/wallet/types'
import {
	IAddUserAssetResponse,
	ICategory
} from '@/src/services/assets/assets-service.interface'
import { AssetsService } from '@/src/services/assets/assets.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

type AssetsErrorPayload = {
	message: string
	status?: number
	details?: unknown
}

export const getUserAssets = createAsyncThunk<
	ICategory[],
	{ userId: number },
	{ rejectValue: AssetsErrorPayload }
>('assets/getUserAssets', async ({ userId }, thunkAPI) => {
	try {
		return await AssetsService.getUserAssets(userId)
	} catch (error) {
		return thunkAPI.rejectWithValue(getAssetsErrorPayload(error))
	}
})

export const addUserAsset = createAsyncThunk<
	IAddUserAssetResponse,
	IRequestPostAsset,
	{ rejectValue: AssetsErrorPayload }
>('assets/addUserAsset', async ({ userId, asset, title }, thunkAPI) => {
	try {
		return await AssetsService.addUserAsset(userId, { asset, title })
	} catch (error) {
		return thunkAPI.rejectWithValue(getAssetsErrorPayload(error))
	}
})

export const removeUserAsset = createAsyncThunk<
	{ categoryTitle: string; nameAsset: string },
	{ userId: number; categoryTitle: string; nameAsset: string },
	{ rejectValue: AssetsErrorPayload }
>(
	'assets/removeUserAsset',
	async ({ userId, categoryTitle, nameAsset }, thunkAPI) => {
		try {
			return await AssetsService.removeUserAsset(
				userId,
				categoryTitle,
				nameAsset
			)
		} catch (error) {
			return thunkAPI.rejectWithValue(getAssetsErrorPayload(error))
		}
	}
)

const getErrorMessage = (data: unknown) => {
	if (!data || typeof data !== 'object' || !('message' in data))
		return undefined

	const message = (data as { message?: unknown }).message

	if (Array.isArray(message)) return message.join(', ')
	if (typeof message === 'string') return message

	return undefined
}

const getAssetsErrorPayload = (error: unknown): AssetsErrorPayload => {
	if (isAxiosError(error)) {
		return {
			message:
				getErrorMessage(error.response?.data) ||
				error.message ||
				'Request failed',
			status: error.response?.status,
			details: error.response?.data
		}
	}

	if (error instanceof Error) return { message: error.message }

	return { message: 'Request failed' }
}
