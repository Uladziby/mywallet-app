import LogActiveDayService from '@/src/services/log-active-day/log-active-day.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMutationTimer = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['update session count'],
		mutationFn: (sessionCount: number) =>
			LogActiveDayService.createOrUpdate(sessionCount),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['get statistics'] })
		}
	})
}
