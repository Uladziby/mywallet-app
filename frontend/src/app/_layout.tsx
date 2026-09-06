import { useColorScheme } from '@/src/hooks/useColorScheme'
import {
	SpaceGrotesk_400Regular,
	SpaceGrotesk_500Medium,
	SpaceGrotesk_700Bold
} from '@expo-google-fonts/space-grotesk'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider
} from 'expo-router/react-navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../store/store'
import '../../global.css'
import RootNavigator from '@/src/navigation/RootNavigator'

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded, error] = useFonts({
		Bold: SpaceGrotesk_700Bold,
		Medium: SpaceGrotesk_500Medium,
		Regular: SpaceGrotesk_400Regular
	})

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync()
		}
	}, [loaded, error])

	if (!loaded && !error) {
		return null
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<RootNavigator />
					</PersistGate>
				</Provider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
