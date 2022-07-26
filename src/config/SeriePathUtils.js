 const getSeriePath = (lakeId, lakeName, dataType, obs, duration) => {
		const baseDir = "/src/data/series/"
		const delimiter = "_"
		return `${baseDir}${lakeId}/${lakeId}${delimiter}${lakeName}${delimiter}${dataType}${delimiter}${obs}${duration}.csv`
 }

 const getTimeseriesPath = (lakeId, location) => {
		const baseDir = "/src/data/series/"
		const delimiter = "_"
		const timeseries = "ZSV_timeseries"
		return `${baseDir}${lakeId}/${lakeId}${delimiter}${location}${delimiter}${timeseries}.csv`
 }

export default { getSeriePath, getTimeseriesPath }