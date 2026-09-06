import { ITimerOptions } from '@/src/store/timer/timer.interface'
import { Dispatch } from 'react'

export interface ITimerProps {
	timer: ITimerOptions
	setTimer: Dispatch<React.SetStateAction<ITimerOptions>>
}
