import { Entypo } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useTimerTime } from '@/src/components/screens/home/timer/circle-timer/useTimerTime'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { useActions } from '@/src/hooks/useActions'
import { useMutationTimer } from '@/src/components/screens/home/timer/useMutationTimer'

interface ITTimerInfo {
	remainingTime: number
}

const formatTime = (time: number) => (time < 10 ? '0' + time : time)

export const TimerInfo: FC<ITTimerInfo> = ({ remainingTime }) => {
	const { status, currentSession } = useTypedSelector(state => state.timer)
	const { minutes, seconds } = useTimerTime(remainingTime)
	const { reset } = useActions()
	const { timer, sessionCountWithBreak } = useQueryTimer()
	const { mutate } = useMutationTimer()

	if (!timer) return null

	return (
		<View className='mt-14 relative'>
			{currentSession === sessionCountWithBreak + 1 && (
				<View className='-left-32 -bottom-28 absolute z-30'>
					<ConfettiCannon
						autoStart
						count={250}
						explosionSpeed={75}
						fallSpeed={4500}
						fadeOut
						origin={{ x: 0, y: 0 }}
					/>
				</View>
			)}

			<Text className='text-6xl text-white font-semibold'>
				{`${formatTime(minutes)}:${formatTime(seconds)}`}
			</Text>
			<Text className='text-center text-2xl mt-1 text-white'>{status}</Text>
			<Pressable
				onPress={() => {
					reset()
					mutate(0)
				}}
				className='self-center opacity-40 mt-6'
			>
				<Entypo name='ccw' size={30} color='white' />
			</Pressable>
		</View>
	)
}
