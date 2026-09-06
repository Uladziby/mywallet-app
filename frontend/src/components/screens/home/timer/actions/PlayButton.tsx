import { playShadow } from '@/src/components/screens/home/timer/button-shadow'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'
import cn from 'clsx'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { useActions } from '@/src/hooks/useActions'

export const PlayButton: FC = () => {
	const { isRunning } = useTypedSelector(state => state.timer)
	const { timer } = useQueryTimer()
	const { toggle } = useActions()

	if (!timer) return null

	return (
		<Pressable
			onPress={() => toggle()}
			className={cn(
				'mx-6  bg-primary w-[65px] h-[65px] items-center justify-center rounded-full',
				{ 'pl-1.5': !isRunning }
			)}
			style={playShadow}
		>
			<Feather name={isRunning ? 'pause' : 'play'} size={45} color='white' />
		</Pressable>
	)
}
