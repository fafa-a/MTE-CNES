import { csv } from 'd3'
import { formatValue } from './value'

export const getDataFormalized = async (path, unit) => {
	try {
		const raw = await csv(path)
		const formalized = formatValue(raw, unit)
		return formalized
	} catch (error) {
		console.error(error)
	}
}
