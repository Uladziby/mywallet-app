import instance from '@/src/services/api/interceptors'
import { IFlowOptions, IFlowOptionsResponse } from './flow-options.interface'

const FlowOptionsService = {
	async getOptions() {
		const response = await instance.get<IFlowOptionsResponse>('/flow-options')
		return response.data
	},

	async updateOptions(body: IFlowOptions) {
		return instance.put('/flow-options', body)
	}
}

export default FlowOptionsService
