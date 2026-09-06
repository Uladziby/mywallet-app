import { ActionButtons } from '@/src/components/screens/home/timer/ActionButtons'
import { CircleTimer } from '@/src/components/screens/home/timer/circle-timer/CircleTimer'
import { EnumStatus, ITimerOptions } from '@/src/store/timer/timer.interface'
import { useState } from 'react'
import { View } from 'react-native'
import { SessionIndicator } from './session-indicators/SessionIndicator'

export const Timer = () => {
	const [timer, setTimer] = useState<ITimerOptions>({
		isRunning: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		key: 0
	})

	return (
		<View className='justify-center w-full'>
			<View className='self-center items-center'>
				<CircleTimer />
				<SessionIndicator />
			</View>
			<ActionButtons setTimer={setTimer} timer={timer} />
		</View>
	)
}
