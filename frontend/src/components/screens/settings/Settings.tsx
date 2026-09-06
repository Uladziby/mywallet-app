import Button from '@/src/components/ui/Button'
import { Dropdown } from '@/src/components/ui/Dropdown'
import Loader from '@/src/components/ui/Loader'
import { IFlowOptionsResponse } from '@/src/services/flow-options/flow-options.interface'
import { Picker } from '@react-native-picker/picker'
import { FC, useState } from 'react'
import { useSettings } from './useSettings'
import { View } from 'react-native'

const Settings: FC = () => {
	const [settings, setSettings] = useState({} as IFlowOptionsResponse)

	const { isUpdateLoading, isLoading, mutate } = useSettings(
		settings,
		setSettings
	)

	if (isLoading) return <Loader />

	return (
		<View className='flex-1 justify-between py-10 w-full'>
			<Dropdown
				placeholder='Session Count'
				onChange={val => setSettings(prev => ({ ...prev, sessionCount: val }))}
				value={settings.sessionCount}
			>
				{Array.from(Array(13).keys()).map(val => {
					if (!val) return null
					return (
						<Picker.Item
							label={val.toString()}
							key={`sessionCount ${val}`}
							value={val}
						/>
					)
				})}
			</Dropdown>
			<Dropdown
				placeholder='Flow Duration (minutes)'
				onChange={val => setSettings(prev => ({ ...prev, flowDuration: val }))}
				value={settings.flowDuration}
			>
				{[15, 20, 25, 30, 45, 52, 90].map(val => {
					return (
						<Picker.Item
							label={val.toString()}
							key={`flowDuration ${val}`}
							value={val}
						/>
					)
				})}
			</Dropdown>
			<Dropdown
				placeholder='Break Duration (minutes)'
				onChange={val => setSettings(prev => ({ ...prev, breakDuration: val }))}
				value={settings.breakDuration}
			>
				{[10, 15, 17, 20, 25, 30].map(val => {
					return (
						<Picker.Item
							label={val.toString()}
							key={`breakDuration ${val}`}
							value={val}
						/>
					)
				})}
			</Dropdown>
			<Button
				variant='primary'
				onPress={() => mutate()}
				disabled={isUpdateLoading}
				style={{ marginTop: 40 }}
			>
				Save
			</Button>
		</View>
	)
}

export default Settings
