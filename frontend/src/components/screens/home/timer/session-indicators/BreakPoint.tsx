import { useQueryTimer } from '@/src/components/screens/home/timer/useQueryTimer'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { View } from 'react-native'

interface IBreakPoint {
	isSmallIndicator: boolean
	index: number
}

export const BreakPoint: FC<IBreakPoint> = ({ isSmallIndicator, index }) => {
	const { timer } = useQueryTimer()

	if (!timer) return null

	if (index + 1 === timer.sessionCount) return null

	return (
		<View
			className={`absolute z-30 -top-4 ${isSmallIndicator ? 'left-[18px]' : 'left-[25px]'}`}
		>
			<AntDesign
				name='rest'
				size={isSmallIndicator ? 16 : 18}
				color={index + 1 < timer.currentBreak ? '#523FC0' : '#2c2b3c'}
			/>
		</View>
	)
}
