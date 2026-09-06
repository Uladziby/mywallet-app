export const formatInverseRate = (rate?: number, fractionDigits = 2) => {
	if (!rate) return '-'

	return (1 / rate).toFixed(fractionDigits)
}
