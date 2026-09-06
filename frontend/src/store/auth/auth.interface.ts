import { IAuthResponse } from '../../services/auth/auth-service.interface'

interface IAuthInitalState extends Omit<IAuthResponse, 'accessToken'> {
	isLoading: boolean
	error: string | null
}

export default IAuthInitalState
