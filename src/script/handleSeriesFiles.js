import fs from "node:fs"

const BASEFOLDER = "./../../public/series"

/* Reading all the files in the baseFolder and then mapping them to an object with the name and whether
it is a folder or not. */
const allFiles = fs.readdirSync(BASEFOLDER)
const filesAndFolders = allFiles.map(file => {
  return {
    name: file,
    isFolder: fs.lstatSync(`${BASEFOLDER}/${file}`).isDirectory(),
  }
})

/* Filtering out the files that are not folders and then mapping them to an array of file names. */
const files = filesAndFolders.filter(file => !file.isFolder)
const fileNames = files.map(file => file.name)

/* A function that takes a filename and splits it by the underscore character. */
const getFileNamePart = filename => filename.split("_")[0]

/**
 * It takes a list of files, creates a folder for each file, and moves the file into the folder
 */
const moveFileToFolder = () => {
  fileNames.forEach(file => {
    const folderName = getFileNamePart(file)
    if (fs.existsSync(`${BASEFOLDER}/${folderName}`)) {
      fs.renameSync(
        `${BASEFOLDER}/${file}`,
        `${BASEFOLDER}/${folderName}/${file}`
      )
    } else {
      fs.mkdirSync(`${BASEFOLDER}/${folderName}`)
      fs.renameSync(
        `${BASEFOLDER}/${file}`,
        `${BASEFOLDER}/${folderName}/${file}`
      )
    }
  })
}

try {
  moveFileToFolder()
  console.log("DONE")
} catch (error) {
  console.error(error)
}
