import { useState } from 'react'
import { Modal, View, Text, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import ActionsModal from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/ActionsModal'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface SelectionRowOption {
	id: string
	primaryText: string
	secondaryText?: string
	leadingIcon?: {
		name: keyof typeof MaterialIcons.glyphMap
		backgroundColor: string
		iconColor?: string
	}
	layout?: 'inline' | 'stacked'
}

interface SettingsSelectionSheetProps {
	visible: boolean
	title: string
	sectionIcon: keyof typeof MaterialIcons.glyphMap
	sectionLabel: string
	options: SelectionRowOption[]
	selectedId: string
	saveLabel?: string
	showSaveArrow?: boolean
	onClose: () => void
	onSave: (id: String) => void
}

interface ISubmitData {
	value: string
}

export const SettingsSelectionSheet = ({
	visible,
	title,
	sectionIcon,
	sectionLabel,
	options,
	selectedId,
	saveLabel = 'Save Changes',
	showSaveArrow = false,
	onClose,
	onSave
}: SettingsSelectionSheetProps) => {
	const [activeId, setActiveId] = useState(selectedId)
	const { control, reset, handleSubmit } = useForm<ISubmitData>({
		mode: 'onChange'
	})
	const hasChanges = activeId !== selectedId

	const onSubmit: SubmitHandler<ISubmitData> = (data: ISubmitData) => {
		onSave(data.value)
		console.log('SettingsSelectionSheet', data)
	}

	return (
		<Modal
			visible={visible}
			transparent
			animationType='slide'
			onRequestClose={onClose}
		>
			<View className='flex-1 justify-end'>
				<Pressable
					className='absolute top-0 left-0 right-0 bottom-0 bg-black/60'
					onPress={onClose}
				/>

				<View className='rounded-t-3xl bg-surface-container-low border border-outline-variant/10 px-5 pt-3 pb-8'>
					<View className='w-10 h-1 rounded-full bg-outline-variant/30 self-center mb-4' />

					<View className='flex-row items-center justify-between mb-6'>
						<Text className='text-on-surface text-xl font-heading font-bold'>
							{title}
						</Text>
						<Pressable
							className='w-8 h-8 rounded-full bg-surface-container-highest items-center justify-center'
							onPress={onClose}
						>
							<MaterialIcons name='close' size={18} color='#9CA3AF' />
						</Pressable>
					</View>

					<View className='flex-row items-center gap-2 mb-3'>
						<MaterialIcons name={sectionIcon} size={14} color='#A78BFA' />
						<Text className='text-[11px] font-label uppercase tracking-wider text-on-surface-variant'>
							{sectionLabel}
						</Text>
					</View>

					<View className='flex-col gap-2 mb-6'>
						{options.map(option => {
							const isSelected = option.id === activeId
							const layout =
								option.layout ?? (option.leadingIcon ? 'stacked' : 'inline')

							return (
								<Pressable
									key={option.id}
									onPress={() => setActiveId(option.id)}
									className={`flex-row items-center justify-between px-4 py-3.5 rounded-2xl border ${
										isSelected
											? 'bg-primary/15 border-primary/40'
											: 'bg-surface-container-highest border-transparent'
									}`}
								>
									<View className='flex-row items-center gap-3 flex-1'>
										{option.leadingIcon && (
											<View
												className='w-9 h-9 rounded-full items-center justify-center'
												style={{
													backgroundColor: option.leadingIcon.backgroundColor
												}}
											>
												<MaterialIcons
													name={option.leadingIcon.name}
													size={16}
													color={option.leadingIcon.iconColor ?? '#fff'}
												/>
											</View>
										)}

										{layout === 'stacked' ? (
											<View className='flex-col flex-1'>
												<Text className='text-on-surface font-semibold text-sm'>
													{option.primaryText}
												</Text>
												{option.secondaryText && (
													<Text className='text-on-surface-variant text-xs mt-0.5'>
														{option.secondaryText}
													</Text>
												)}
											</View>
										) : (
											<View className='flex-row items-center gap-3'>
												<Text
													className={`font-semibold text-sm ${
														isSelected ? 'text-primary' : 'text-on-surface'
													}`}
												>
													{option.primaryText}
												</Text>
												{option.secondaryText && (
													<Text className='text-on-surface-variant text-sm'>
														{option.secondaryText}
													</Text>
												)}
											</View>
										)}
									</View>

									<View
										className={`w-5 h-5 rounded-full items-center justify-center border ${
											isSelected
												? 'bg-primary border-primary'
												: 'border-outline-variant/40 bg-transparent'
										}`}
									>
										{isSelected && (
											<MaterialIcons name='check' size={12} color='#fff' />
										)}
									</View>
								</Pressable>
							)
						})}
					</View>
					<ActionsModal
						name='Apply'
						onClose={() => false}
						onAdd={handleSubmit(onSubmit)}
					/>
				</View>
			</View>
		</Modal>
	)
}
