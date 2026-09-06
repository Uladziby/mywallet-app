import { FC, PropsWithChildren } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import cn from 'clsx'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Layout: FC<PropsWithChildren<{ title?: string; className?: string }>> = ({
	children,
	title,
	className
}) => {
	const { top } = useSafeAreaInsets()

	return (
		<SafeAreaView className={cn('flex-1 bg-[#1E1F29]', className)}>
			<View
				className='flex-1 px-6'
				style={{
					paddingTop: top * 1.6
				}}
			>
				{title && (
					<Text className='text-3xl text-white font-semibold text-center'>
						{title}
					</Text>
				)}
				<View className='flex-1 '>{children}</View>
			</View>
		</SafeAreaView>
	)
}

export default Layout
