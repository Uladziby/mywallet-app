import { FC, useState } from 'react'
import { View } from 'react-native'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { ProfileMenuElement } from '@/src/components/screens/profile/ProfileMenuElement'
import { useBottomTabBarHeight } from 'expo-router/js-tabs'
import { GreetingElement } from '@/src/components/screens/profile/GreetingElement'
import { WrapperSubMenu } from '@/src/components/screens/profile/WrapperSubMenu'
import { LogoutButton } from '@/src/components/screens/profile/LogoutButton'
import { useActions } from '@/src/hooks/useActions'
import ModalLayout from '@/src/components/screens/wallet/AddAssetModal/ModalLayout'
import HeaderModal from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/HeaderModal'
import ActionsModal from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/ActionsModal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/FormInput'
import {
	SelectionRowOption,
	SettingsSelectionSheet
} from '@/src/components/screens/profile/SettingsSelectionSheet'

enum TypeMenuEnum {
	nickname = 'Nickname',
	password = ' Password',
	email = 'Email',
	currency = 'Currency',
	theme = 'Theme'
}

const CURRENCIES: SelectionRowOption[] = [
	{ id: 'USD', primaryText: 'USD', secondaryText: 'United States Dollar' },
	{ id: 'EUR', primaryText: 'EUR', secondaryText: 'European Euro' },
	{ id: 'PLN', primaryText: 'PLN', secondaryText: 'Polish Złoty' },
	{ id: 'GBP', primaryText: 'GBP', secondaryText: 'British Pound Sterling' }
]

interface IPreferencesForm {
	value: string
}

interface IInputForm {
	label: TypeMenuEnum
	placeholder?: string
}

const Profile: FC = () => {
	const tabBarHeight = useBottomTabBarHeight()
	const { user } = useTypedSelector(state => state.auth)
	const { logout } = useActions()
	const [modalVisible, setModalVisible] = useState(false)
	const { control, reset, handleSubmit } = useForm<IPreferencesForm>({
		mode: 'onChange'
	})
	const [inputData, setInputData] = useState<IInputForm>({
		label: TypeMenuEnum.email,
		placeholder: user?.email
	})

	const openModal = (value: TypeMenuEnum) => {
		switch (value) {
			case TypeMenuEnum.nickname:
				setInputData({ label: value, placeholder: user?.email })
				break
			case TypeMenuEnum.password:
				setInputData({ label: value, placeholder: user?.password })

				break
			case TypeMenuEnum.email:
				setInputData({
					label: value,
					placeholder: user?.email
				})

				break
			case TypeMenuEnum.currency:
				// TODO: open currency modal
				break
			case TypeMenuEnum.theme:
				// TODO: open theme modal

				break
			default:
				break
		}
		setModalVisible(true)
	}

	const onSubmit: SubmitHandler<IPreferencesForm> = (data: {
		value: string
	}) => {
		console.log('Profile', data)

		//onAdd(data)
		reset()
		setModalVisible(false)
	}

	return (
		<View
			className='flex-1 w-full mx-auto justify-between'
			style={{ paddingBottom: tabBarHeight + 46 }}
		>
			<View className='flex-col gap-6'>
				<GreetingElement name={user?.email} />
				<WrapperSubMenu title='Account Settings'>
					<ProfileMenuElement
						imageName={'person'}
						label={'Nickname'}
						value={user!.email}
						typeButton={'chevron'}
						openModal={() => openModal(TypeMenuEnum.nickname)}
					/>
					<ProfileMenuElement
						imageName={'mail'}
						label={'Email Address'}
						value={user!.email}
						typeButton={'chevron'}
						openModal={() => openModal(TypeMenuEnum.email)}
					/>
					<ProfileMenuElement
						imageName={'lock'}
						label={'Security'}
						value={'Change Password'}
						typeButton={'chevron'}
						openModal={() => openModal(TypeMenuEnum.password)}
					/>
				</WrapperSubMenu>
				<WrapperSubMenu title='Preferences'>
					<ProfileMenuElement
						imageName={'payments'}
						value={'Currency'}
						labelButton='USD'
						typeButton={'unfold'}
						openModal={() => openModal(TypeMenuEnum.currency)}
					/>
					<ProfileMenuElement
						imageName={'dark-mode'}
						value={'Theme'}
						labelButton='Obsidian Dark'
						typeButton={'unfold'}
						openModal={() => openModal(TypeMenuEnum.theme)}
					/>
				</WrapperSubMenu>
			</View>

			<LogoutButton logout={() => logout()} />
			<ModalLayout
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
			>
				<HeaderModal title='' onClose={() => setModalVisible(false)} />
				<FormInput
					control={control}
					name={'value'}
					label={inputData.label}
					rules={{ required: 'Asset name is required' }}
					placeholder={inputData.placeholder}
				/>
				<ActionsModal
					name='Apply'
					onClose={() => setModalVisible(false)}
					onAdd={handleSubmit(onSubmit)}
				/>
			</ModalLayout>
			<SettingsSelectionSheet
				visible={modalVisible}
				title={''}
				sectionIcon={'label'}
				sectionLabel={''}
				options={CURRENCIES}
				selectedId={''}
				onClose={() => setModalVisible(false)}
				onSave={() => onSubmit}
			/>
		</View>
	)
}

export default Profile
