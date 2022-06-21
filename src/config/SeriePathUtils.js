export const getSeriePath = (lakeId, dataType, obs, duration) => {
  const baseDir = "/src/data/series/"
  const delimitter = "_"
  return `${baseDir}${lakeId}/${lakeId}${delimitter}${dataType}${delimitter}${obs}${duration}.csv`
}

export default {
  getSeriePath
}