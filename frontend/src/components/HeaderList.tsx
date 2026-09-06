import { View, Text } from 'react-native'

export const HeaderList = () => {
	return (
		<View className='mt-5 px-2 flex-row justify-between items-center w-full flex-nowrap'>
			<Text className='text-xs font-bold text-dark-primary'>#</Text>
			<Text className='text-xs font-bold text-dark-primary'>Source</Text>
			<Text className='text-xs font-bold text-dark-primary'>Amount</Text>
			<Text className='text-xs font-bold text-dark-primary'>Amount in USD</Text>
			<Text className='text-xs font-bold text-dark-primary'>Actions</Text>
		</View>
	)
}
