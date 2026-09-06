import { X } from 'lucide-react-native'
import React from 'react'
import { View, Text, Pressable } from 'react-native'

const HeaderModal = ({
	title,
	onClose
}: {
	title: string
	onClose: () => void
}) => {
	return (
		<View className='flex-row justify-between items-center mb-8'>
			<Text className='text-2xl font-headline font-bold text-on-surface'>
				{title}
			</Text>
			<Pressable onPress={onClose} className='p-1'>
				<X size={22} color='#ccc3d6' />
			</Pressable>
		</View>
	)
}

export default HeaderModal
