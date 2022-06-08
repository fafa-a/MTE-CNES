import { usePapaParse } from "react-papaparse"

const { readString } = usePapaParse()

const CSVToJSON = csvFile => {
  console.time("test")
  if (csvFile !== undefined) {
    const obj = new Object()
    obj.observation = []

    const papaConfig = {
      download: true,
      step: row => {
        if (row.data[0] === "id") {
          obj.id = row.data[1]
        } else if (row.data[0] === "name" || row.data[0] === "Nom") {
          obj.name = row.data[1]
        } else if (row.data[0] === "surface") {
          obj.surface = row.data[1]
        } else {
          const date = row.data[0]
          const value = row.data[1]
          obj.observation.push({ date, value })
        }
      },
      complete: file => {
        console.log("Parsing complete")
      },
      error: (error, file) => {
        console.log("Error while parsing:", error, file)
      },
    }
    readString(csvFile, papaConfig)
    return obj
  }
}

const CSVToJSONPromise = csvFile => {
  return new Promise(resolve => {
    if (csvFile !== undefined) {
      const obj = new Object()
      obj.observation = []
      const papaConfig = {
        download: true,
        step: row => {
          if (row.data[0] === "id") {
            obj.id = row.data[1]
          } else if (row.data[0] === "name" || row.data[0] === "Nom") {
            obj.name = row.data[1]
          } else if (row.data[0] === "surface") {
            obj.surface = row.data[1]
          } else {
            const date = row.data[0]
            const value = row.data[1]
            obj.observation.push({ date, value })
          }
        },
        complete: () => {
          console.log("Parsing complete")
          resolve(obj)
        },
        error: (error, file) => {
          console.log("Error while parsing:", error, file)
        },
      }
      readString(csvFile, papaConfig)
      return obj
    }
  })
}

export { CSVToJSONPromise }
