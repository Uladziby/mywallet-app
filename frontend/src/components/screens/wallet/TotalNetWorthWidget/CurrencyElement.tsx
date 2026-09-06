import { View, Text } from 'react-native'

export const CurrencyElement = ({
	name,
	value
}: {
	name: string
	value: string
}) => {
	return (
		<>
			<View className='w-1/3 flex items-start flex-col gap-0.5'>
				<Text className='font-label text-[10px] text-secondary-fixed uppercase font-bold tracking-widest'>
					{name}
				</Text>
				<Text className='font-label text-sm font-semibold text-primary-fixed tracking-tight'>
					{value}
				</Text>
			</View>
		</>
	)
}
