export const extractDataByYear = data => {
  const dataByYear = {}
  data
    .map(item => {
      return {
        date: new Date(item.date),
        value: item.value,
      }
    })
    .map((item, index) => {
      const year = item.date.getFullYear()
      if (!dataByYear[year]) {
        dataByYear[year] = []
      }
      const date = `${item.date.getFullYear()}-${
        item.date.getMonth() + 1 < 10
          ? `0${item.date.getMonth() + 1}`
          : item.date.getMonth() + 1
      }-${
        item.date.getDate() < 10
          ? `0${item.date.getDate()}`
          : item.date.getDate()
      }`
      dataByYear[year].push({
        date,
        value: item.value,
      })
    })

  return dataByYear
}
export const groupDataByYear = data => {
  const dataByYear = {}
  const yearsArray = Object.keys(data[0])
  yearsArray.forEach(year => {
    dataByYear[year] = []
  })
  Object.entries(data).forEach(([, obsType]) => {
    Object.entries(obsType).forEach((obs, index) => {
      const [year, value] = obs
      if (year === yearsArray[index]) {
        dataByYear[year].push([value])
      }
    })
  })
  return dataByYear
}
