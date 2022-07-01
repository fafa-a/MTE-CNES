export const getSeriePath = (lakeId, lakeName, dataType, obs, duration) => {
  const baseDir = "/src/data/series/"
  const delimiter = "_"
  return `${baseDir}${lakeId}/${lakeId}${delimiter}${lakeName}${delimiter}${dataType}${delimiter}${obs}${duration}.csv`
}

export default {
  getSeriePath,
}
