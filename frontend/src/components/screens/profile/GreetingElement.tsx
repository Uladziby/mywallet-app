import { FC } from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface GreetingElementProps {
	name?: string
}

export const GreetingElement: FC<GreetingElementProps> = ({ name }) => {
	return (
		<View className='flex-row items-center justify-center py-8'>
			<View className='items-center gap-2'>
				<Text className='text-4xl font-headline font-extrabold tracking-tighter text-on-surface'>
					Hello {name}!
				</Text>
				<View className='flex-row items-center self-center gap-2 px-4 py-1.5 bg-primary-container/20 border border-primary/20 rounded-full'>
					<MaterialIcons name='star' size={16} color='#A78BFA' />
					<Text className='font-label text-sm uppercase tracking-[0.2em] text-primary font-bold'>
						Sovereign Member
					</Text>
				</View>
			</View>
		</View>
	)
}
