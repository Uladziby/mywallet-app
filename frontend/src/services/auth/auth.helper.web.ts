const ACCESS_TOKEN_KEY = 'accessToken'
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1'])

const isLocalhost = () => {
	if (typeof window === 'undefined') return false

	return LOCAL_HOSTNAMES.has(window.location.hostname)
}

const getStorage = () => {
	if (typeof window === 'undefined') return null

	return isLocalhost() ? window.localStorage : null
}

export const getTokenFromStorage = async () => {
	return getStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null
}

export const saveTokenToStorage = async (accessToken: string) => {
	getStorage()?.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export const removeTokenFromStorage = async () => {
	getStorage()?.removeItem(ACCESS_TOKEN_KEY)
}
