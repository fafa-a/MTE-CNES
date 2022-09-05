export const returnHighestValue = (arr) => {
	const rateRef = arr.map((days) => {
		const max = days.reduce((acc, curr) => {
			return acc.value > curr.value ? acc : curr
		}, 0)
		return max.value
	})
	return rateRef
}
