import { textVariants, variants } from '@/src/utils/tokens'
import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'

interface IButton extends PressableProps {
	variant?: 'primary' | 'secondary' | 'inverted' | 'outlined'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant = 'primary',
	...rest
}) => {
	const isTextContent =
		typeof children === 'string' || typeof children === 'number'

	return (
		<Pressable
			className={cn(
				'self-center mt-3 py-3 px-8 rounded-3xl active:opacity-70 items-center justify-center',
				variants[variant],
				className
			)}
			{...rest}
		>
			{isTextContent ? (
				<Text
					className={cn('font-semibold text-base', textVariants[variant])}
					style={{ color: variant === 'primary' ? '#FFFFFF' : undefined }}
				>
					{children}
				</Text>
			) : (
				children
			)}
		</Pressable>
	)
}

export default Button
