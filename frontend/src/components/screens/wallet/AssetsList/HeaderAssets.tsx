import { View, Text } from 'react-native'

interface HeaderAssetsElementProps {
	title: string
	count: number
}

export const HeaderAssetsElement = ({
	title,
	count
}: HeaderAssetsElementProps) => {
	return (
		<View className='flex items-center justify-between p-2 flex-row'>
			<Text
				style={{ fontFamily: 'Bold' }}
				className='font-headline text-lg text-primary-fixed'
			>
				{title}
			</Text>
			<Text className='font-label text-sm font-bold text-secondary'>
				{count} Assets
			</Text>
		</View>
	)
}
