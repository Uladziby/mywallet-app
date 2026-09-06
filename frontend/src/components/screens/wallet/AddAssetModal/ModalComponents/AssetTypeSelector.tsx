import {
	AssetTitleType,
	assetTypes
} from '@/src/components/screens/wallet/types'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const AssetTypeSelector = ({
	onSelectType,
	selectedType
}: {
	onSelectType: (type: AssetTitleType) => void
	selectedType: AssetTitleType
}) => {
	return (
		<View className='flex-row gap-3 mb-10'>
			{assetTypes.map(({ id, label, Icon }) => {
				const isSelected = selectedType === id

				return (
					<Pressable
						key={id}
						onPress={() => onSelectType(id)}
						className={`flex-1 items-center justify-center py-5 rounded-2xl bg-[#2E2D3D] border-2 ${
							isSelected ? 'border-primary-container' : 'border-transparent'
						}`}
					>
						<Icon
							size={28}
							color={isSelected ? '#d2bcff' : '#958e9f'}
							strokeWidth={1.5}
						/>
						<Text
							className={`font-label text-[10px] uppercase tracking-widest font-bold mt-2 ${
								isSelected ? 'text-primary' : 'text-on-surface-variant'
							}`}
						>
							{label}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

export default AssetTypeSelector
