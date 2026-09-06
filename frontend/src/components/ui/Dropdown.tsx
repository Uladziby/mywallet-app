import { Picker } from '@react-native-picker/picker'
import { FC, PropsWithChildren } from 'react'
import { View, Text } from 'react-native'

export interface IDropdown {
	value: number | string
	onChange: (itemValue: any, itemIndex: number) => void
	placeholder: string
}

export const Dropdown: FC<PropsWithChildren<IDropdown>> = ({
	value,
	onChange,
	placeholder,
	children
}) => {
	return (
		<View className='mt-8'>
			<Text className='mb-2 text-white text-xl font-semibold'>
				{placeholder}
			</Text>
			<View className='bg-[#262738] rounded-2xl px-4'>
				<Picker
					selectedValue={value}
					onValueChange={onChange}
					style={{
						fontSize: 18,
						height: 55,
						overflow: 'hidden',
						justifyContent: 'center',
						color: '#A97BFF'
					}}
					itemStyle={{
						color: '#A97BFF',
						fontSize: 18
					}}
					dropdownIconColor='#A97BFF'
				>
					{children}
				</Picker>
			</View>
		</View>
	)
}
