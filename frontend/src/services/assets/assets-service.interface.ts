import { IAssets } from '@/src/components/screens/wallet/types'

export type ICategory = {
	id: number
	title: string
	assetsUserId: number
	asset: IAssets[]
}

export interface IAddUserAssetResponse {
	title: string
	asset: IAssets
}
