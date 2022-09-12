import { csv } from "d3"
import { formatValue } from "./value"

export const getDataFormalized = async (path,unit) => {
	const raw = await csv(path)
	const formalized = formatValue(raw,unit)
	return formalized
}
