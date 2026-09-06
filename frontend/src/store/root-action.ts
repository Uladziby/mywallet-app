import timerSlice from '@/src/store/timer/timer.slice'
import * as authActions from './auth/auth.actions'
import * as assetsSlice from './assets/assets.actions'

const rootAction = {
	...authActions,
	...assetsSlice,
	...timerSlice.actions
}

export default rootAction
