import AuthScreen from '@/src/components/screens/auth/AuthScreen'
import { useAuth } from '@/src/hooks/useAuth'
import { TypeRootStackParamList } from '@/src/navigation/navigation.types'
import { routes } from '@/src/navigation/routes'
//import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Stack } from 'expo-router'

//const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigation: FC = () => {
	const { user } = useAuth()

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: '#1E1C2E' }
			}}
		>
			{!user ? (
				routes.map(({ name, title }) => (
					<Stack.Screen key={name} name={name} options={{ title }} />
				))
			) : (
				<Stack.Screen name='auth' />
			)}
		</Stack>
	)
}

export default PrivateNavigation
