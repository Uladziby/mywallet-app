import { ICategory } from '@/src/services/assets/assets-service.interface'

export interface IUserAssetsInitialState {
	isLoading: boolean
	totalNetWorthWidget: number
	userData: IAssetsCategory
}

interface IAssetsCategory {
	userId?: number
	categories: ICategory[]
}
