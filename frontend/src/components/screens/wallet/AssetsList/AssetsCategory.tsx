import { IAssets } from '@/src/components/screens/wallet/types'
import { AssetsElement } from './AssetsElement'
import { HeaderAssetsElement } from './HeaderAssets'
import { View } from 'react-native'

interface AssetsCategoryProps {
	title: string
	assets: IAssets[]
	onDelete: (params: { categoryTitle: string; nameAsset: string }) => void
}

export const AssetsCategory = ({
	title,
	assets,
	onDelete
}: AssetsCategoryProps) => {
	const categoryAssets = assets ?? []

	const handleDelete = (nameAsset: string) => {
		onDelete({ categoryTitle: title, nameAsset })
	}

	return (
		<View>
			<HeaderAssetsElement title={title} count={categoryAssets.length} />
			{categoryAssets.map((asset, index) => (
				<AssetsElement key={index} assets={asset} onDelete={handleDelete} />
			))}
		</View>
	)
}
