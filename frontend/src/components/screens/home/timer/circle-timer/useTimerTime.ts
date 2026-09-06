export const useTimerTime = (remainingTime: number) => {
	return {
		minutes: Math.floor(remainingTime / 60),
		seconds: remainingTime % 60
	}
}
