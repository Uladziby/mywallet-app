import { ICategory } from '@/src/services/assets/assets-service.interface'

export const calculateTotalWorth = (assetsData: ICategory[] = []) => {
	return assetsData.reduce((total, category) => {
		const categoryAssets = category.asset ?? []
		const categoryTotal = categoryAssets.reduce(
			(categorySum, asset) => categorySum + asset.balance,
			0
		)
		return total + categoryTotal
	}, 0)
}
