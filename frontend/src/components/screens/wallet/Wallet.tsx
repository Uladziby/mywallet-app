import { AddAssetModal } from '@/src/components/screens/wallet/AddAssetModal/AddAssetModal'
import {
	IAssetFormData,
	ImageEnum
} from '@/src/components/screens/wallet/types'
import { Plus } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { AssetsList } from './AssetsList/AssetsList'
import { TotalNetWorthWidget } from './TotalNetWorthWidget/TotalNetWorthWidget'
import { useActions } from '@/src/hooks/useActions'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'

const Wallet = () => {
	const insets = useSafeAreaInsets()
	const { user } = useTypedSelector(state => state.auth)
	const {
		userData: { categories: assetsDataStore },
		totalNetWorthWidget
	} = useTypedSelector(state => state.assets)
	const { getUserAssets, addUserAsset, removeUserAsset } = useActions()
	const assetsData = assetsDataStore

	const [modalVisible, setModalVisible] = useState(false)

	const handleAddAsset = (data: IAssetFormData) => {
		if (user) {
			addUserAsset({
				userId: user.id,
				title: data.selectedType,
				asset: {
					name: data.name,
					place: data.place,
					balance: Number(data.balance),
					change: 0,
					imageUri: ImageEnum.usd,
					typeCurrency: 'USD'
				}
			})
		}
	}

	useEffect(() => {
		console.log(user?.email, 'email')
		if (user) {
			getUserAssets({ userId: user.id })
		}
	}, [getUserAssets, user])

	const handleDeleteAsset = ({
		categoryTitle,
		nameAsset
	}: {
		categoryTitle: string
		nameAsset: string
	}) => {
		if (user) {
			removeUserAsset({ userId: user.id, categoryTitle, nameAsset })
		}
	}

	return (
		<SafeAreaView className='flex-1 bg-[#1E1F29]' edges={['top']}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='flex-1'
				contentContainerStyle={{
					flexGrow: 1,
					paddingHorizontal: 24,
					paddingTop: 16,
					paddingBottom: 104 + insets.bottom
				}}
			>
				<View style={{ position: 'relative' }}>
					<TotalNetWorthWidget totalNetWorth={totalNetWorthWidget} />
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						accessibilityRole='button'
						accessibilityLabel='Add asset'
						style={{
							position: 'absolute',
							top: 16,
							right: 16,
							zIndex: 10,
							width: 56,
							height: 56,
							borderRadius: 28,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#D2BCFF',
							shadowColor: '#25005A',
							shadowOpacity: 0.3,
							shadowRadius: 8,
							shadowOffset: { width: 0, height: 4 },
							elevation: 6
						}}
					>
						<Plus size={28} color='#571BB7' />
					</TouchableOpacity>
				</View>

				{assetsData.length === 0 ? (
					<View className='flex-1 items-center justify-center py-16'>
						<Text className='text-white text-lg'>Your wallet is empty.</Text>
					</View>
				) : (
					<AssetsList assets={assetsData} onDelete={handleDeleteAsset} />
				)}
			</ScrollView>
			<AddAssetModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onAdd={data => handleAddAsset(data)}
			/>
		</SafeAreaView>
	)
}

export default Wallet
