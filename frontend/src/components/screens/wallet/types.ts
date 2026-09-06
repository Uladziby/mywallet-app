import { Landmark, Bitcoin, Banknote } from 'lucide-react-native'

export enum AssetTitleType {
	Crypto = 'Crypto',
	Cash = 'Cash',
	BankAccounts = 'BankAccounts'
}

export interface AddAssetModalProps {
	visible: boolean
	onClose: () => void
	onAdd: (data: IAssetFormData) => void
}

export const assetTypes: {
	id: AssetTitleType
	label: string
	Icon: React.ElementType
}[] = [
	{
		id: AssetTitleType.BankAccounts,
		label: 'Bank',
		Icon: Landmark
	},
	{ id: AssetTitleType.Crypto, label: 'Crypto', Icon: Bitcoin },
	{ id: AssetTitleType.Cash, label: 'Cash', Icon: Banknote }
]

export interface IAssets {
	name: string
	place: string
	balance: number
	typeCurrency: string
	change: number
	imageUri: string | ImageEnum
}

export interface IRequestPostAsset {
	userId: number
	title: AssetTitleType
	asset: IAssets
}

export enum ImageEnum {
	usd = 'usd',
	eur = 'eur',
	sol = 'sol'
}

export interface IAssetFormData {
	selectedType: AssetTitleType
	name: string
	balance: string
	place: string
}
