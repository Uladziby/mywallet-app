import React from 'react'
import { View, Pressable, Text, TouchableOpacity } from 'react-native'

const ActionsModal = ({
	name,
	onClose,
	onAdd
}: {
	name: string
	onClose: () => void
	onAdd: () => void
}) => {
	return (
		<View>
			<Pressable onPress={onClose} className='items-center pb-4'>
				<Text className='text-on-surface-variant font-body font-semibold text-sm'>
					Cancel
				</Text>
			</Pressable>
			<TouchableOpacity
				onPress={onAdd}
				className='w-full h-[52px] bg-primary-container items-center justify-center rounded-xl'
			>
				<Text className='text-on-primary font-headline font-bold text-lg'>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ActionsModal
