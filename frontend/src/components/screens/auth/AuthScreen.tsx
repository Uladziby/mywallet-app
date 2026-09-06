import { AuthFields } from '@/src/components/screens/auth/AuthFields'
import Button from '@/src/components/ui/Button'
import GoogleIcon from '@/src/components/ui/GoogleIcon'
import Loader from '@/src/components/ui/Loader'
import { useActions } from '@/src/hooks/useActions'
import { useAuth } from '@/src/hooks/useAuth'
import { IAuthFormData } from '@/src/types/auth.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Keyboard,
	Pressable,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const AuthScreen: FC = () => {
	const [isReg, setIsReg] = useState(false)
	const { control, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})
	const { login, register } = useActions()
	const { error, isLoading } = useAuth()

	const onSubmit: SubmitHandler<IAuthFormData> = (data: IAuthFormData) => {
		if (isReg) register(data)
		else login(data)
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center flex-1 justify-around  bg-[#1E1F29]'>
				<View className='w-3/4 '>
					<Text className='m-10 text-center font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface'>
						Join the Vault
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<View className=''>
								<AuthFields control={control} />
								{error && (
									<Text
										accessibilityRole='alert'
										className='mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-red-400'
									>
										{error}
									</Text>
								)}
								<Button
									className='w-full min-h-[56px] py-4 rounded-xl bg-primary-container hover:scale-[1.02] active:scale-95 shadow-primary-container/10'
									onPress={handleSubmit(onSubmit)}
								>
									{isReg ? 'Sign Up' : 'Log In'}
								</Button>
								<View className='pt-4 flex-row items-center justify-center'>
									<Text className='mt-4 flex-shrink mx-4 font-label text-[10px] uppercase tracking-[0.2em] text-primary-fixed'>
										The Sovereign Choice
									</Text>
								</View>
								<Button className='w-full min-h-[56px] py-4 rounded-xl bg-[#2e2d3d] shadow-primary-container/10'>
									<View className='flex-row w-full items-center justify-center hover:scale-[1.02] active:scale-95'>
										<View className='mr-3'>
											<GoogleIcon color='#D2BCFF' />
										</View>

										<Text
											className='font-bold text-lg text-center'
											style={{ color: '#D2BCFF' }}
										>
											Log In with Google
										</Text>
									</View>
								</Button>
							</View>
						</>
					)}
				</View>

				<View className='flex-row justify-between w-full'>
					<View className=''>
						<Text className=' font-label text-[10px] uppercase tracking-[0.2em] text-primary-fixed'>
							{isReg ? 'Already have an account?' : 'New to the vault?'}
						</Text>
					</View>
					<Pressable
						onPress={() => setIsReg(prev => !prev)}
						className='text-on-primary-container font-headline font-bold text-lg hover:scale-[1.02] active:scale-95  shadow-primary-container/10"'
					>
						<Text className='text-opacity-60 text-primary-container'>
							{isReg ? 'Log In' : 'Create Account'}
						</Text>
					</Pressable>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default AuthScreen
