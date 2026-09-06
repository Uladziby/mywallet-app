import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { Stack } from 'expo-router'

const RootNavigator = () => {
	const { user } = useTypedSelector(state => state.auth)
	const isLoggedIn = !!user

	return (
		<Stack>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name='sign-in' options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	)
}

export default RootNavigator
