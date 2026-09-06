import { ChangeIndicator } from '@/src/components/screens/wallet/AssetsList/ChangeIndicator'
import DeleteActionComponent from '@/src/components/screens/wallet/AssetsList/DeleteActionComponent'
import { IAssets } from '@/src/components/screens/wallet/types'
import { formatCurrency } from '@/src/utils/formatCurrency'
import { renderImage } from '@/src/utils/renderImage'
import { useRef } from 'react'
import { View, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { SharedValue } from 'react-native-reanimated'

interface AssetsElementProps {
	assets: IAssets
	onDelete?: (name: string) => void
}

type SwipeableRef = React.ComponentRef<typeof Swipeable>

export const AssetsElement = ({
	assets: { name, place, balance, change, imageUri },
	onDelete
}: AssetsElementProps) => {
	const swipeableRef = useRef<SwipeableRef>(null)

	const handleDelete = () => {
		swipeableRef.current?.close()
		onDelete?.(name)
	}

	const renderRightActions = (progress: SharedValue<number>) => (
		<DeleteActionComponent progress={progress} onPress={handleDelete} />
	)

	return (
		<View className='mt-2'>
			<Swipeable
				ref={swipeableRef}
				renderRightActions={renderRightActions}
				rightThreshold={72}
				overshootRight={false}
				friction={2}
			>
				<View className='space-y-3'>
					<View className='flex items-center flex-row justify-between p-4 bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-all duration-300'>
						<View className='flex items-center flex-row gap-4'>
							<View className='w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center overflow-hidden'>
								{renderImage(imageUri)}
							</View>
							<View>
								<Text className='font-body font-semibold text-on-surface'>
									{name}
								</Text>
								<Text className='font-body text-xs text-on-surface-variant'>
									{place}
								</Text>
							</View>
						</View>
						<View className='flex-col items-end gap-1'>
							<Text className='font-label text-right text-xl font-bold text-primary-fixed'>
								{formatCurrency(balance)}
							</Text>
							<ChangeIndicator change={change} />
						</View>
					</View>
				</View>
			</Swipeable>
		</View>
	)
}
