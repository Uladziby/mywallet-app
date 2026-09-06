import { CurrencyElement } from './CurrencyElement'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text } from 'react-native'
import { formatCurrency } from '@/src/utils/formatCurrency'
import { fetchCurrencyWidgetData } from '@/src/services/currency-widget/curency-widget.service'
import { useEffect, useState } from 'react'
import { formatInverseRate } from '@/src/utils/formatInverseRate'
import Loader from '@/src/components/ui/Loader'

interface ICurrencyDataPln {
	date: string
	pln: {
		usd: number
		eur: number
		gbp: number
		eth: number
		btc: number
	}
}

interface ICurrencyDataUsd {
	date: string
	usd: {
		eth: number
		btc: number
	}
}

//TODO : add button to refresh currencyRates

export const TotalNetWorthWidget = ({
	totalNetWorth
}: {
	totalNetWorth: number
}) => {
	const [currencyData, setCurrencyData] = useState<ICurrencyDataPln | null>(
		null
	)
	const [cryptoData, setCryptoData] = useState<ICurrencyDataUsd | null>(null)
	const [error, setError] = useState({ message: '' })

	const fetchWidgetData = async () => {
		fetchCurrencyWidgetData('pln')
			.then(data => {
				setCurrencyData(data)
			})
			.catch(error => {
				setError({ message: `Error fetching data:${error}` })
			})
	}

	const fetchWidgetDataCrypto = async () => {
		fetchCurrencyWidgetData('usd')
			.then(data => {
				setCryptoData(data)
			})
			.catch(error => {
				setError({ message: `Error fetching data:${error}` })
			})
	}

	useEffect(() => {
		fetchWidgetData()
		fetchWidgetDataCrypto()
	}, [])

	return (
		<View className='relative overflow-hidden shadow-2xl '>
			<LinearGradient
				colors={['#4c1d95', '#7c3aed', '#c4b5fd']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ borderRadius: 16, padding: 18, width: '100%' }}
			>
				<View>
					<Text className='text-[#D2BCFF] text-xs text-bold tracking-widest uppercase'>
						Total net worth
					</Text>
				</View>
				<View>
					<Text
						style={{ fontFamily: 'Bold' }}
						className='text-white text-bold tracking-tighter text-5xl'
					>
						{formatCurrency(totalNetWorth, 'USD', 'narrowSymbol')}
					</Text>
				</View>
				<View>
					<Text className='text-[#D2BCFF]'>+5.00% this month</Text>
				</View>
				<View className='mt-8 w-full border-t border-white/10 pt-4'>
					{!error?.message && currencyData?.pln.btc ? (
						<>
							<View className='mb-3 flex-row items-center gap-2'>
								<Text className='font-label text-[10px] text-secondary-fixed uppercase font-bold tracking-widest'>
									Rates date :
								</Text>

								<Text className='font-label text-sm font-semibold text-primary-fixed tracking-tight'>
									{currencyData?.date ?? '-'}
								</Text>
							</View>
							<View className='flex flex-row flex-wrap gap-y-4 w-full'>
								<CurrencyElement
									name='USD/PLN'
									value={formatInverseRate(currencyData?.pln?.usd)}
								/>
								<CurrencyElement
									name='EUR/PLN'
									value={formatInverseRate(currencyData?.pln?.eur)}
								/>
								<CurrencyElement
									name='GBP/PLN'
									value={formatInverseRate(currencyData?.pln?.gbp)}
								/>
								<CurrencyElement
									name='ETH/USD'
									value={formatInverseRate(cryptoData?.usd?.eth, 0)}
								/>
								<CurrencyElement
									name='BTC/USD'
									value={formatInverseRate(cryptoData?.usd?.btc, 0)}
								/>
							</View>
						</>
					) : (
						<View className='flex justify-center'>
							<Text className='font-label text-[10px] text-secondary-fixed uppercase font-bold tracking-widest'>
								{!error.message && !currencyData?.pln.btc ? (
									<Loader />
								) : (
									'No Data'
								)}
							</Text>
						</View>
					)}
				</View>
			</LinearGradient>
		</View>
	)
}
