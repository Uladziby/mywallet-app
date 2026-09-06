import {
	Control,
	Controller,
	FieldValues,
	Path,
	RegisterOptions
} from 'react-hook-form'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import cn from 'clsx'

interface FormInputProps<T extends FieldValues> extends TextInputProps {
	control: Control<T>
	name: Path<T>
	rules?: RegisterOptions<T>
	label: string
	placeholder?: string
	render?: object
}

const labelClassName =
	'block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 px-1'
const fieldClassName =
	'rounded-xl bg-surface-container-lowest px-5 h-[60px] justify-center mb-4'

export const FormInput = <T extends FieldValues>({
	control,
	name,
	rules,
	label,
	placeholder,
	...inputProps
}: FormInputProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error }
			}) => (
				<>
					<Text className={labelClassName}>{label}</Text>
					<View
						className={cn(
							fieldClassName,
							error
								? 'border-solid border border-red-500'
								: 'border border-transparent'
						)}
					>
						<TextInput
							placeholder={placeholder}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							placeholderTextColor='#565060'
							className='w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-surface-tint/40 rounded-xl py-4 px-5 text-on-surface  transition-all duration-300'
							{...inputProps}
						/>
					</View>
					{error && <Text className='text-red-500'>{error.message}</Text>}
				</>
			)}
		/>
	)
}
