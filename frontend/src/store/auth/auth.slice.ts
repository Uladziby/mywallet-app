import { AuthService } from '@/src/services/auth/auth.service'
import { login, logout, register } from '@/src/store/auth/auth.actions'
import { createSlice } from '@reduxjs/toolkit'
import IAuthInitalState from './auth.interface'

const initialState: IAuthInitalState = {
	isLoading: false,
	error: null,
	user: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.user = payload.user
			})
			.addCase(register.rejected, (state, { payload, error }) => {
				state.isLoading = false
				state.error = payload?.message || error.message || 'Unable to sign up'
				state.user = null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.user = payload.user
			})
			.addCase(login.rejected, (state, { payload, error }) => {
				state.isLoading = false
				state.error = payload?.message || error.message || 'Unable to log in'
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.error = null
				state.user = null
				AuthService.logout()
			})
	}
})

export default authSlice
