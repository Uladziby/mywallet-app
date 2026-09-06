import BottomMenu from '@/src/components/ui/BottomMenu/BottomMenu'
import { useNavigationContainerRef } from "expo-router/react-navigation"
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Navigation = () => {
	const { user } = useAuth()

	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)

		const listener = navRef.addListener('state', () => {
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		})

		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])

	return (
		<>
			{user && currentRoute && (
				<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
			)}
		</>
	)
}
export default Navigation
