import { EnumStatus, ITimerOptions } from './timer.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITimerOptions = {
	isRunning: false,
	status: EnumStatus.REST,
	currentSession: 1,
	key: 0
}

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		completeSession: state => {
			const { currentSession, key } = state

			state.status = currentSession % 2 ? EnumStatus.REST : EnumStatus.WORK

			state.currentSession =
				currentSession % 2 ? currentSession + 1 : currentSession
			state.isRunning = false

			state.key = key + 1
		},
		changeSession: (state, { payload }: PayloadAction<'prev' | 'next'>) => {
			const { currentSession, key } = state
			const isPrev = payload === 'prev'

			state.currentSession = isPrev ? currentSession - 1 : currentSession + 1
			state.key = isPrev ? key - 1 : key + 1
			state.isRunning = false
		},
		toggle: state => {
			state.isRunning = !state.isRunning
		},
		completeDay: state => {
			state.status = EnumStatus.COMPLETED
		},
		reset: () => initialState
	}
})

export default timerSlice
