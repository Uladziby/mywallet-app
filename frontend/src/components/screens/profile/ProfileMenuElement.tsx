import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, Text, Pressable } from 'react-native'

interface ProfileMenuElementProps {
	imageName: keyof typeof MaterialIcons.glyphMap
	label?: string
	value: string
	labelButton?: string
	typeButton: 'unfold' | 'chevron'
	openModal: () => void
}

export const ProfileMenuElement = ({
	imageName,
	label,
	value,
	labelButton,
	typeButton,
	openModal
}: ProfileMenuElementProps) => {
	return (
		<View className='flex-row items-center px-2 justify-between border-t border-outline-variant/10 '>
			<View className='flex-row items-center gap-4 '>
				<View className='w-12 h-12 rounded-lg bg-surface-container-highest items-center justify-center'>
					<MaterialIcons name={imageName} size={20} color='#A78BFA' />
				</View>

				<View className='flex-col align-middle'>
					{label && (
						<Text className='text-[10px] font-label uppercase tracking-wider text-on-surface-variant'>
							{label}
						</Text>
					)}

					<Text className='text-on-surface font-medium'>{value}</Text>
				</View>
			</View>
			<Pressable className='flex-row items-center gap-2' onPress={openModal}>
				<Text className='font-label text-sm uppercase text-on-surface-variant'>
					{labelButton}
				</Text>
				<MaterialIcons
					name={typeButton === 'unfold' ? 'unfold-more' : 'chevron-right'}
					size={16}
					color='#9CA3AF'
				/>
			</Pressable>
		</View>
	)
}
