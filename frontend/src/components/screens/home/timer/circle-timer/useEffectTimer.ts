import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { useActions } from '@/src/hooks/useActions'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { useEffect } from 'react'

export const useEffectTimer = () => {
	const { completeDay } = useActions()
	const { currentSession } = useTypedSelector(state => state.timer)

	const { sessionCountWithBreak } = useQueryTimer()

	useEffect(() => {
		if (currentSession === sessionCountWithBreak + 1) {
			completeDay()
		}
	}, [currentSession])
}
