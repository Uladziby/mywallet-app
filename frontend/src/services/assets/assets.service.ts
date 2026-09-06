import instance from '@/src/services/api/interceptors'
import { IAddUserAssetResponse, ICategory } from './assets-service.interface'
import { IRequestPostAsset } from '@/src/components/screens/wallet/types'

export const AssetsService = {
	async getUserAssets(userId: number) {
		const response = await instance.get<ICategory[]>(`/assets/user/${userId}`)
		return response.data
	},

	async addUserAsset(
		userId: number,
		assetData: Omit<IRequestPostAsset, 'userId'>
	): Promise<IAddUserAssetResponse> {
		const response = await instance.post(`/assets/user/${userId}`, assetData)
		return response.data
	},

	async removeUserAsset(
		userId: number,
		categoryTitle: string,
		nameAsset: string
	) {
		await instance.delete(
			`/assets/user/${userId}/${categoryTitle}/${nameAsset}`
		)
		return { categoryTitle, nameAsset }
	}
}
