// ChangeIndicator.tsx
import { View, Text } from 'react-native'

export function ChangeIndicator({ change }: { change: number }) {
	const pos = change > 0
	const neg = change < 0

	const icon = pos ? '↑' : neg ? '↓' : '−'
	const label = pos ? `${change}%` : `${Math.abs(change)}%`

	return (
		<View
			className='flex-row items-center self-end rounded-md px-2 py-0.5 gap-1'
			style={{ backgroundColor: pos ? '#1a3020' : neg ? '#2d1a1e' : '#252535' }}
		>
			<Text
				className='text-[11px] font-semibold'
				style={{ color: pos ? '#4ade80' : neg ? '#f87171' : '#6b6b88' }}
			>
				{icon}
			</Text>
			<Text
				className='text-[11px] font-semibold'
				style={{ color: pos ? '#4ade80' : neg ? '#f87171' : '#6b6b88' }}
			>
				{label}
			</Text>
		</View>
	)
}
