import timerSlice from '@/src/store/timer/timer.slice'
import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import assetsSlice from '@/src/store/assets/assets.slice'

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	timer: timerSlice.reducer,
	assets: assetsSlice.reducer
})

export default rootReducer
