import { ITimerProps } from './timer.interface'
import { FC } from 'react'
import { View } from 'react-native'
import { Arrow } from './actions/Arrow'
import { PlayButton } from '@/src/components/screens/home/timer/actions/PlayButton'

export const ActionButtons: FC<ITimerProps> = ({
	timer: { currentSession, isRunning },
	setTimer
}) => {
	return (
		<View className='justify-center items-center flex-row mt-10 '>
			<Arrow
				currentSession={currentSession}
				direction='left'
				setTimer={setTimer}
			/>
			<PlayButton />
			<Arrow
				currentSession={currentSession}
				direction='right'
				setTimer={setTimer}
			/>
		</View>
	)
}
