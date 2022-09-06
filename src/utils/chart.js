export const handleDataSetsOptions = (
	arrDataSets,
	activeData,
	dataOption,
	dataSetOption,
	obsTypes
) => {
	const newData = [...arrDataSets]
	const activeDataIndex = activeData.map((el) => {
		return {
			index: el.index,
			[dataOption]: el[dataOption],
		}
	})
	for (const item of activeDataIndex) {
		const { index } = item
		const dataOptionValue = item[dataOption]

		if (obsTypes.length === 1) {
			if (dataOptionValue) {
				newData[index][dataSetOption] = false
			}
			if (!dataOptionValue) {
				newData[index][dataSetOption] = true
			}
		}

		if (obsTypes.length === 2) {
			if (dataOptionValue) {
				newData[index === 0 ? 0 : index * 2][dataSetOption] = false
				newData[index === 0 ? 1 : index * 2 + 1][dataSetOption] = false
			}
			if (!dataOptionValue) {
				newData[index === 0 ? 0 : index * 2][dataSetOption] = true
				newData[index === 0 ? 1 : index * 2 + 1][dataSetOption] = true
			}
		}
		if (obsTypes.length === 3) {
			if (dataOptionValue) {
				newData[index === 0 ? 0 : index * 3][dataSetOption] = false
				newData[index === 0 ? 1 : index * 3 + 1][dataSetOption] = false
				newData[index === 0 ? 2 : index * 3 + 2][dataSetOption] = false
			}
			if (!dataOptionValue) {
				newData[index === 0 ? 0 : index * 3][dataSetOption] = true
				newData[index === 0 ? 1 : index * 3 + 1][dataSetOption] = true
				newData[index === 0 ? 2 : index * 3 + 2][dataSetOption] = true
			}
		}
	}
	return newData
}
