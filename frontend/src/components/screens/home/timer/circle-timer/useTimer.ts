import ConfettiCannon from 'react-native-confetti-cannon'
import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/src/components/screens/home/timer/timer.interface'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'
import { useCallback } from 'react'

interface IUseTimer
	extends
		Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'currentSession' | 'status'> {
	confettiRef: React.RefObject<ConfettiCannon | null>
}

export const useTimer = ({
	setTimer,
	confettiRef,
	currentSession,
	status
}: IUseTimer) => {
	const completetSession = useCallback(() => {
		setTimer(prev => ({
			...prev,
			isRunning: false,
			key: prev.key + 1
		}))
	}, [])

	return { completetSession }
}
