import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { IPointProps } from './session-indicator.interface'

const Line: FC<IPointProps> = ({ index, isSmallIndicator }) => {
	const { timer, sessionCountWithBreak } = useQueryTimer()
	const { currentSession } = useTypedSelector(state => state.timer)

	if (!timer) return null

	if (index >= sessionCountWithBreak) return null

	return (
		<View
			className={cn(
				'h-0.5 bg-[#2C2B3C]',
				{
					'bg-primary opacity-70': index < currentSession
				},
				isSmallIndicator ? 'w-5' : 'w-4'
			)}
		/>
	)
}

export default Line
