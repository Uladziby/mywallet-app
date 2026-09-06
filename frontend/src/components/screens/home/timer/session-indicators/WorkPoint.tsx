import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'

interface IPointProps {
	isSmallIndicator: boolean
	index: number
}

export const WorkPoint: FC<IPointProps> = ({ index, isSmallIndicator }) => {
	const { currentSession } = useTypedSelector(state => state.timer)

	return (
		<View
			className={cn(
				'rounded-full border-[3px]',
				index === currentSession
					? 'bg-[#1E1C2E] border-[#523FC0]'
					: 'bg-[#2C2B3C] border-transparent',
				{
					'bg-primary opacity-70':
						index + 1 <= currentSession && index + 1 !== currentSession
				},
				isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
			)}
		/>
	)
}
