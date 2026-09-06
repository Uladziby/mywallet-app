import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FC } from 'react'
import { Pressable, View, Text } from 'react-native'

interface LogoutButtonProps {
	logout: () => void
}

export const LogoutButton: FC<LogoutButtonProps> = ({ logout }) => {
	return (
		<View>
			<Pressable
				onPress={() => logout()}
				className='flex-row items-center justify-center gap-3 py-4 bg-surface-container border border-error/20 rounded-xl active:scale-95'
			>
				<MaterialIcons name='logout' size={18} color='#EF4444' />
				<Text className='font-headline font-bold uppercase tracking-widest text-error text-sm'>
					Log Out
				</Text>
			</Pressable>
		</View>
	)
}
