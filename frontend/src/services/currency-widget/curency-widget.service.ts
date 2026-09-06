export const fetchCurrencyWidgetData = async (currency: string) => {
	try {
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_CURRENCIES_API_URL}/${currency}.json`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		return data
	} catch (error) {
		throw error
	}
}
