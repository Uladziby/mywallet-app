import { IFlowOptionsResponse } from '@/src/services/flow-options/flow-options.interface'
import FlowOptionsService from '@/src/services/flow-options/flow-options.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export const useSettings = (
	settings: IFlowOptionsResponse,
	setSettings: React.Dispatch<React.SetStateAction<IFlowOptionsResponse>>
) => {
	const { isLoading, data, refetch } = useQuery({
		queryKey: ['get settings'],
		queryFn: () => FlowOptionsService.getOptions()
	})

	useEffect(() => {
		if (data) {
			setSettings({
				breakDuration: data.breakDuration / 60,
				flowDuration: data.flowDuration / 60,
				sessionCount: data.sessionCount
			})
		}
	}, [data])

	const { isPending: isUpdateLoading, mutate } = useMutation({
		mutationKey: ['update settings'],
		mutationFn: () =>
			FlowOptionsService.updateOptions({
				break_duration: settings.breakDuration * 60,
				flow_duration: settings.flowDuration * 60,
				session_count: settings.sessionCount
			}),
		onSuccess: async () => {
			await refetch()
			Alert.alert('Success', 'Settings updated successfully')
		}
	})

	return { mutate, isLoading, isUpdateLoading }
}
