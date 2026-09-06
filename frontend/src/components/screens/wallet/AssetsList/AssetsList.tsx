import { AssetsCategory } from '@/src/components/screens/wallet/AssetsList/AssetsCategory'
import { ICategory } from '@/src/services/assets/assets-service.interface'
import { ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const AssetsList = ({
	assets,
	onDelete
}: {
	assets: ICategory[]
	onDelete: (params: { categoryTitle: string; nameAsset: string }) => void
}) => {
	const categories = assets ?? []

	return (
		<GestureHandlerRootView>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerClassName='space-y-10 pt-5 pb-32 bg-[#1E1F29]'
			>
				{categories.map((category, index) => (
					<AssetsCategory
						key={index}
						title={category.title}
						assets={category.asset}
						onDelete={onDelete}
					/>
				))}
			</ScrollView>
		</GestureHandlerRootView>
	)
}
