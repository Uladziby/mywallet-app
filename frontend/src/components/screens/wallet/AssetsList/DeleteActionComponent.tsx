import { Trash2 } from 'lucide-react-native'
import { Pressable, View } from 'react-native'
import Reanimated, {
	SharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolation
} from 'react-native-reanimated'

const DeleteActionComponent = ({
	progress,
	onPress
}: {
	progress: SharedValue<number>
	onPress: () => void
}) => {
	const iconAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			progress.value,
			[0, 0.35, 1],
			[0, 0.8, 1],
			Extrapolation.CLAMP
		),
		transform: [
			{
				scale: interpolate(
					progress.value,
					[0, 1],
					[0.85, 1],
					Extrapolation.CLAMP
				)
			}
		]
	}))

	return (
		<View className='h-full justify-center'>
			<View className='relative h-full justify-center'>
				<Reanimated.View className='h-full w-[72px] items-center justify-center rounded-r-xl bg-red-500'>
					<Pressable
						onPress={onPress}
						className='h-full w-full items-center justify-center'
					>
						<Reanimated.View style={iconAnimatedStyle}>
							<Trash2 color='white' size={22} strokeWidth={2.4} />
						</Reanimated.View>
					</Pressable>
				</Reanimated.View>
			</View>
		</View>
	)
}

export default DeleteActionComponent
