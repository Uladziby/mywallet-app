import { Input } from '@/src/components/shared/Input'
import { Colors } from '@/src/utils/Colors'
import { CircleX } from 'lucide-react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const ElementList = ({}) => {
	return (
		<View style={styles.container}>
			<Text className='mt-200' style={[styles.text, {}]}>
				1
			</Text>
			<Text style={[styles.text, { flexBasis: 80 }]}>Revolut</Text>
			<Input placeholder='amount' style={styles.input} />
			<Text style={styles.text}> 10 USD</Text>
			<TouchableOpacity onPress={() => {}}>
				<CircleX color={Colors.dark.primary} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap'
	},
	text: {
		color: Colors.dark.text,
		fontSize: 16,
		textAlign: 'center',
		wordWrap: 'break-word'
	},
	input: {
		backgroundColor: Colors.dark.backgroundColor
	}
})
