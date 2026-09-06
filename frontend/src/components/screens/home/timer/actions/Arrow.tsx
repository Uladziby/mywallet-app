import { ITimerProps } from '@/src/components/screens/home/timer/timer.interface'
import { useMutationTimer } from '@/src/components/screens/home/timer/useMutationTimer'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { useActions } from '@/src/hooks/useActions'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'

interface IArrowProps extends Omit<ITimerProps, 'timer'> {
	direction: 'left' | 'right'
	currentSession: number
}

export const Arrow: FC<IArrowProps> = ({ direction }) => {
	const { currentSession } = useTypedSelector(state => state.timer)
	const { timer, sessionCountWithBreak } = useQueryTimer()
	const { changeSession } = useActions()
	const { mutate } = useMutationTimer()

	if (!timer) return null

	return (
		<Pressable
			onPress={() => {
				if (currentSession !== 1 && direction === 'left') {
					changeSession('prev')
					if (currentSession % 2) mutate(Math.ceil(currentSession / 2))
				}

				if (
					currentSession !== sessionCountWithBreak + 1 &&
					direction === 'right'
				) {
					changeSession('next')
					if (currentSession % 2) mutate(Math.ceil(currentSession / 2))
				}
			}}
			className='opacity-50'
		>
			<Entypo name={`chevron-${direction}`} size={34} color='white' />
		</Pressable>
	)
}
