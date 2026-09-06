export enum EnumStatus {
	REST = 'REST',
	WORK = 'HARD WORK',
	COMPLETED = 'WELL DONE'
}

export interface ITimerOptions {
	isRunning: boolean
	status: EnumStatus
	currentSession: number
	key: number
}
