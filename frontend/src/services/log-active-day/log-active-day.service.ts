import instance from '@/src/services/api/interceptors'
import { IStatisticsResponse } from './log-active-day.interface'

const LogActiveDayService = {
	async getStatistics() {
		return instance.get<IStatisticsResponse[]>('/log-active-day/statistics')
	},

	async createOrUpdate(sessionCount: number) {
		return instance.post('/log-active-day', { sessionCount })
	}
}

export default LogActiveDayService
