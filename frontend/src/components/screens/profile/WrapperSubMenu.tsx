import { View, Text } from 'react-native'

export const WrapperSubMenu = ({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) => {
	return (
		<View className='flex-col gap-6'>
			<Text className='font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2'>
				{title}
			</Text>
			<View className='bg-surface-container rounded-xl overflow-hidden gap-3'>
				{children}
			</View>
		</View>
	)
}
