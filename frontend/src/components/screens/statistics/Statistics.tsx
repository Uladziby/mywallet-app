import Layout from '@/src/components/ui/Layout'
import Loader from '@/src/components/ui/Loader'
import LogActiveDayService from '@/src/services/log-active-day/log-active-day.service'
import { Colors } from '@/src/utils/Colors'
import { useQuery } from '@tanstack/react-query'
import React, { FC } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Rect, Svg, Text as TextSVG } from 'react-native-svg'

const Statistics: FC = () => {
	const { width } = useWindowDimensions()
	const [tooltipPos, setTooltipPos] = React.useState({
		x: 0,
		y: 0,
		value: 0,
		visible: false
	})
	const { isLoading, data } = useQuery({
		queryKey: ['get statistics'],
		queryFn: () => LogActiveDayService.getStatistics(),
		select: res => res.data
	})

	if (isLoading) return <Loader />

	if (!data) return <Text className='text-white'>No data</Text>

	return (
		<View className=''>
			<LineChart
				data={{
					labels: data.map(item => item.month.trim()),
					datasets: [
						{
							data: data.map(item => item.session_count)
						},
						{ data: [1], withDots: false }
					]
				}}
				width={width - 30}
				height={280}
				fromZero
				verticalLabelRotation={30}
				withHorizontalLines={false}
				withVerticalLines={false}
				chartConfig={{
					backgroundGradientFrom: '#1E1C2E',
					backgroundGradientTo: '#1E1C2E',
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16
					},
					propsForDots: {
						r: '6',
						strokeWidth: '2',
						stroke: Colors.primary
					}
				}}
				bezier
				decorator={() => {
					return tooltipPos.visible ? (
						<View>
							<Svg>
								<Rect
									x={tooltipPos.x - 42}
									y={tooltipPos.y + 10}
									width='70'
									height='30'
									fill='#2C2B3C'
									ry={5}
									rx={5}
								/>
								<TextSVG
									x={tooltipPos.x - 5}
									y={tooltipPos.y + 30}
									fill='white'
									fontSize='16'
									fontWeight='bold'
									textAnchor='middle'
								>
									{tooltipPos.value + 'flow'}
								</TextSVG>
							</Svg>
						</View>
					) : null
				}}
				onDataPointClick={data => {
					let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y

					if (isSamePoint) {
						setTooltipPos(previousState => {
							return {
								...previousState,
								value: data.value,
								visible: !previousState.visible
							}
						})
					} else {
						setTooltipPos({
							x: data.x,
							value: data.value,
							y: data.y,
							visible: true
						})
					}
				}}
			/>
		</View>
	)
}

export default Statistics
