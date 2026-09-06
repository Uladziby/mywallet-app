import {
	AssetTitleType,
	assetTypes
} from '@/src/components/screens/wallet/types'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { placeholders, LabelsNames } from '@/src/utils/constants'
import { FormInput } from './FormInput'

export interface IAddAssetFormData {
	name: string
	balance: string
	place: string
	selectedType: AssetTitleType
}

const AddAssetFields: FC<{ control: Control<IAddAssetFormData> }> = ({
	control
}) => {
	return (
		<>
			<Controller
				control={control}
				defaultValue={AssetTitleType.Crypto}
				name='selectedType'
				render={({ field: { value, onChange } }) => (
					<View className='flex-row gap-3 mb-10'>
						{assetTypes.map(({ id, label, Icon }) => {
							const isSelected = value === id

							return (
								<Pressable
									key={id}
									onPress={() => onChange(id)}
									className={`flex-1 items-center justify-center py-5 rounded-2xl bg-[#2E2D3D] border-2 ${
										isSelected
											? 'border-primary-container'
											: 'border-transparent'
									}`}
								>
									<Icon
										size={28}
										color={isSelected ? '#d2bcff' : '#958e9f'}
										strokeWidth={1.5}
									/>
									<Text
										className={`font-label text-[10px] uppercase tracking-widest font-bold mt-2 ${
											isSelected ? 'text-primary' : 'text-on-surface-variant'
										}`}
									>
										{label}
									</Text>
								</Pressable>
							)
						})}
					</View>
				)}
			/>
			<FormInput
				control={control}
				name={'name'}
				label={LabelsNames.ASSET_NAME}
				rules={{ required: 'Asset name is required' }}
				placeholder={placeholders.ASSET_NAME_INPUT}
			/>
			<FormInput
				control={control}
				name={'balance'}
				keyboardType='numeric'
				label={LabelsNames.BALANCE}
				rules={{
					required: 'Balance is required',
					pattern: {
						value: /^\d+(\.\d{0,2})?$/,
						message: 'Enter a valid amount'
					}
				}}
				placeholder={placeholders.BALANCE_INPUT}
			/>
			<FormInput
				control={control}
				name={'place'}
				label={LabelsNames.PLACE}
				rules={{ required: 'Place is required' }}
				placeholder={placeholders.PLACE_INPUT}
			/>
		</>
	)
}

export default AddAssetFields
