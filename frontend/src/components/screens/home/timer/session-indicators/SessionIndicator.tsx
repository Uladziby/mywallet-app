import { FC } from 'react'
import { View } from 'react-native'
import { BreakPoint } from '@/src/components/screens/home/timer/session-indicators/BreakPoint'
import { WorkPoint } from './WorkPoint'
import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import Line from './Line'

export const SessionIndicator: FC = () => {
	const { timer, sessionCountWithBreak } = useQueryTimer()

	if (!timer) return null

	const isSmallIndicator = timer.sessionCount > 7

	return (
		<View className='mt-14 flex-row items-center justify-center'>
			{Array.from(Array(sessionCountWithBreak)).map((_, index) => {
				index = index + 1
				return (
					<View
						className='flex-row items-center relative'
						key={`point ${index}`}
					>
						{index % 2 ? (
							<WorkPoint index={index} isSmallIndicator={isSmallIndicator} />
						) : (
							<BreakPoint isSmallIndicator={isSmallIndicator} index={index} />
						)}

						<Line index={index} isSmallIndicator={isSmallIndicator} />
					</View>
				)
			})}
		</View>
	)
}
