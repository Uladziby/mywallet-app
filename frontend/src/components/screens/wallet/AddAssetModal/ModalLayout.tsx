import React from 'react'
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	ScrollView,
	View
} from 'react-native'

interface ModalLayoutProps {
	visible: boolean
	onClose: () => void
	children: React.ReactNode
}

const ModalLayout = ({ children, onClose, visible }: ModalLayoutProps) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType='slide'
			onRequestClose={onClose}
		>
			<View className='flex-1 bg-black/60 justify-end '>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					<View className='bg-surface-container rounded-t-[2.5rem] pb-10'>
						<View className='items-center pt-4'>
							<View className='w-12 h-1.5 bg-surface-container-highest rounded-full' />
						</View>

						<ScrollView
							className='px-8 pt-4'
							showsVerticalScrollIndicator={false}
							keyboardShouldPersistTaps='handled'
						>
							{children}
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
			</View>
		</Modal>
	)
}

export default ModalLayout
