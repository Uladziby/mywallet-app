import { TimerInfo } from '@/src/components/screens/home/timer/circle-timer/TimerInfo'
import { useEffectTimer } from '@/src/components/screens/home/timer/circle-timer/useEffectTimer'
import { useMutationTimer } from '@/src/components/screens/home/timer/useMutationTimer'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import Loader from '@/src/components/ui/Loader'
import { useActions } from '@/src/hooks/useActions'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { EnumStatus } from '@/src/store/timer/timer.interface'
import React, { FC } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export const CircleTimer: FC = () => {
	useEffectTimer()
	const { completeSession } = useActions()
	const { status, isRunning, key, currentSession } = useTypedSelector(
		state => state.timer
	)
	const { timer, isLoading } = useQueryTimer()
	const { mutate } = useMutationTimer()

	if (isLoading) return <Loader />
	if (!timer) return null

	return (
		<CountdownCircleTimer
			key={key}
			isPlaying={isRunning}
			duration={
				status === EnumStatus.REST ? timer.breakDuration : timer.flowDuration
			}
			colors={['#3A3570', '#664FF3']}
			colorsTime={[
				status === EnumStatus.REST ? timer.breakDuration : timer.flowDuration,
				0
			]}
			onComplete={() => {
				completeSession()
				if (currentSession % 2) mutate(Math.ceil(currentSession / 2))
			}}
			size={320}
			strokeWidth={5}
		>
			{({ remainingTime }) => <TimerInfo remainingTime={remainingTime} />}
		</CountdownCircleTimer>
	)
}
