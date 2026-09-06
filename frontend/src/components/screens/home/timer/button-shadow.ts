import { Platform } from 'react-native'

export const playShadow = Platform.select({
	ios: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.76,
		shadowRadius: 8
	},
	android: {
		elevation: 20
	},
	web: {
		boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.76)'
	}
})
