import { IUser } from '../../types/user.interface'

export interface IAuthResponse {
	user: IUser | null
	accessToken: string
}
