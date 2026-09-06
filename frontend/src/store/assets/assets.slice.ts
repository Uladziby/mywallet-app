import {
	addUserAsset,
	getUserAssets,
	removeUserAsset
} from '@/src/store/assets/assets.actions'
import { IUserAssetsInitialState } from '@/src/store/assets/assets.interface'
import { calculateTotalWorth } from '@/src/utils/calculateTotalRate'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUserAssetsInitialState = {
	isLoading: false,
	totalNetWorthWidget: 0,
	userData: {
		userId: 0,
		categories: [
			{
				title: 'Crypto',
				id: 1,
				assetsUserId: 1,
				asset: [
					{
						name: 'Bitcoin',
						place: 'Cold Wallet',
						balance: 800.0,
						change: -5.0,
						imageUri: '',
						typeCurrency: 'USD'
					}
				]
			}
		]
	}
}

const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserAssets.pending, state => {
				state.isLoading = true
			})
			.addCase(getUserAssets.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.userData.categories = payload.map(category => ({
					id: category.id,
					title: category.title,
					assetsUserId: category.assetsUserId,
					asset: (category.asset ?? []).map(asset => ({
						name: asset.name,
						place: asset.place,
						balance: asset.balance,
						change: asset.change,
						imageUri: asset.imageUri,
						typeCurrency: asset.typeCurrency
					}))
				}))
				state.totalNetWorthWidget = calculateTotalWorth(payload)
			})
			.addCase(getUserAssets.rejected, state => {
				state.isLoading = false
				state.userData.categories = []
				state.totalNetWorthWidget = 0
			})
			.addCase(addUserAsset.pending, state => {
				state.isLoading = true
			})
			.addCase(addUserAsset.fulfilled, (state, { payload, meta }) => {
				state.isLoading = false

				const categoryTitle = payload.title ?? meta.arg.title
				const newAsset = payload.asset ?? meta.arg.asset
				const existingCategory = state.userData.categories.find(
					category => category.title === categoryTitle
				)

				if (existingCategory) {
					existingCategory.asset.push(newAsset)
				} else {
					state.userData.categories.push({
						id: state.userData.categories.length + 1,
						title: categoryTitle,
						assetsUserId: meta.arg.userId,
						asset: [newAsset]
					})
				}

				state.totalNetWorthWidget = calculateTotalWorth(
					state.userData.categories
				)
			})
			.addCase(addUserAsset.rejected, (state, { payload }) => {
				state.isLoading = false
				console.error('Failed to add asset', payload)
			})
			.addCase(removeUserAsset.fulfilled, (state, { payload }) => {
				state.userData.categories = state.userData.categories.map(element =>
					element.title === payload.categoryTitle
						? {
								...element,
								asset: element.asset.filter(
									asset => asset.name !== payload.nameAsset
								)
							}
						: element
				)
				state.totalNetWorthWidget = calculateTotalWorth(
					state.userData.categories
				)
			})
			.addCase(removeUserAsset.rejected, () => {
				console.error('Failed to remove asset')
			})
	}
})

export default assetsSlice
