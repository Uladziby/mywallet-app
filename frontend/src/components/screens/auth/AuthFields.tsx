import { FormInput } from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/FormInput'
import { IAuthFormData } from '@/src/types/auth.interface'
import { validEmail } from '@/src/utils/email.reg'
import { FC } from 'react'
import { Control } from 'react-hook-form'

export const AuthFields: FC<{ control: Control<IAuthFormData> }> = ({
	control
}) => {
	return (
		<>
			<FormInput<IAuthFormData>
				control={control}
				name='email'
				placeholder='example@mail.com'
				autoCapitalize='none'
				label='Email'
				rules={{
					required: 'Email is required',
					pattern: { value: validEmail, message: 'Email is not valid' }
				}}
			/>
			<FormInput<IAuthFormData>
				control={control}
				name='password'
				placeholder='********'
				autoCapitalize='none'
				label='Password'
				secureTextEntry
			/>
		</>
	)
}
