import { Colors } from '@/src/utils/Colors'
import { ActivityIndicator } from 'react-native'

const Loader = () => {
	return <ActivityIndicator size='large' color={Colors.dark.primary} />
}
export default Loader
