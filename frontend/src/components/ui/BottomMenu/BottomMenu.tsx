import { FC } from 'react'
import { TypeNav } from './menu.interface'
import { Text, View } from 'react-native'
import { menuData } from './menu'
import MenuItem from '@/src/components/ui/BottomMenu/MenuItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IBottomMenu {
	nav: TypeNav
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = ({ nav, currentRoute }) => {
	const { bottom } = useSafeAreaInsets()

	return (
		<View
			style={{ paddingBottom: bottom + 5 }}
			className='pt-5 px-3 justify-between items-center w-full bg-[#1E1C2E]'
		>
			{menuData.map(item => (
				<MenuItem
					key={item.path}
					item={item}
					nav={nav}
					currentRoute={currentRoute}
				/>
			))}
		</View>
	)
}

export default BottomMenu
