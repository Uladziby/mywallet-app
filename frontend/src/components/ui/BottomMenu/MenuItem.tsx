import { IMenu, TypeNav } from '@/src/components/ui/BottomMenu/menu.interface'
import { Colors } from '@/src/utils/Colors'
import Feather from '@expo/vector-icons/build/Feather'
import { FC } from 'react'
import { Pressable } from 'react-native'

interface IMenuItemProps {
	item: IMenu
	nav: TypeNav
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
	const isActive = currentRoute === item.path

	return (
		<Pressable className='w-[24%] items-center' onPress={() => nav(item.path)}>
			<Feather
				name={item.iconName}
				size={26}
				color={isActive ? Colors.active : 'black'}
			/>
		</Pressable>
	)
}

export default MenuItem
