export function formatCurrency(
	amount: number,
	currency: string = 'USD',
	currencyDisplay: Intl.NumberFormatOptions['currencyDisplay'] = 'symbol'
): string {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		currencyDisplay,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount)
}
