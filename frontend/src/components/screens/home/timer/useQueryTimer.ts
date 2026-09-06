import FlowOptionsService from '@/src/services/flow-options/flow-options.service'
import { useQuery } from '@tanstack/react-query'

export const useQueryTimer = () => {
	const { isLoading, data: timer } = useQuery({
		queryKey: ['get timer options'],
		queryFn: () => FlowOptionsService.getOptions(),
		select: (response: any) => response.data
	})

	return {
		isLoading,
		timer,
		sessionCountWithBreak: timer ? timer.sessionCount * 2 - 1 : 1
	}
}
