import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	profile: undefined
	auth: undefined
	timer: undefined
	settings: undefined
	statistics: undefined
	index: undefined
	wallet: undefined
}

export default interface IRoute {
	name: keyof TypeRootStackParamList
	component?: ComponentType
	title: string
	icon: string
}
