import { routes } from '@/src/navigation/routes'
import { Colors } from '@/src/utils/Colors'
import { components } from '@/src/utils/theme'
import { Feather } from '@expo/vector-icons'
import { Tabs, usePathname } from 'expo-router'
import { ColorValue, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface TabIconProps {
	focused: boolean
	color: ColorValue
	icon: string
}

const tabBar = components.tabBar

export default function TabLayout() {
	const pathname = usePathname()
	const insets = useSafeAreaInsets()
	const { width: screenWidth } = useWindowDimensions()

	const TabIcon = ({ focused, color, icon }: TabIconProps) => {
		return (
			<View
				style={{
					width: 48,
					height: 48,
					borderRadius: 24,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: focused ? '#D2BCFF' : 'transparent'
				}}
			>
				<Feather
					size={24}
					name={icon as any}
					color={color}
					resizeMode='contain'
				/>
			</View>
		)
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.active,
				tabBarInactiveTintColor: '#C7AAFF',
				tabBarShowLabel: false,
				animation: pathname.startsWith('/') ? 'fade' : 'none',
				sceneStyle: { backgroundColor: '#1E1F29' },
				tabBarStyle: {
					position: 'absolute',
					left: 0,
					marginLeft: 24,
					width: screenWidth - 48,
					bottom: Math.max(insets.bottom, 16),
					height: 64,
					borderRadius: 24,
					backgroundColor: Colors.primary,
					borderTopWidth: 0,
					paddingHorizontal: 8,
					shadowColor: '#000000',
					shadowOpacity: 0.24,
					shadowRadius: 12,
					shadowOffset: { width: 0, height: 6 },
					elevation: 10
				},
				tabBarItemStyle: {
					height: 64,
					alignItems: 'center',
					justifyContent: 'center'
				},
				tabBarIconStyle: {
					width: tabBar.iconFrame,
					height: tabBar.iconFrame,
					alignItems: 'center',
					justifyContent: 'center'
				}
			}}
		>
			{routes.map(({ name, title, icon }) => (
				<Tabs.Screen
					key={name}
					name={name}
					options={{
						headerShown: false,
						title: title,
						tabBarLabel: title,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon focused={focused} color={color} icon={icon} />
						)
					}}
				/>
			))}
		</Tabs>
	)
}
