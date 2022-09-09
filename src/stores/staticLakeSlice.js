import { createSlice, current } from "@reduxjs/toolkit"
import { AppConfig, DataTypes,DurationTypes,ObservationTypes, SeriePathUtils } from "../config/index"
const initialState = {
	information: {},
	seriePath: {},
}

const { getSeriePath } = SeriePathUtils
export const staticLakeSlice = createSlice({
	name: "information",
	initialState,
	reducers: {
		addInformation: (state, action) => {
			const { id, info } = action.payload

			state.information[id] = info
      
      const serieTmp = []
      const s1 = getSeriePath(
        id,
        info.name,
        AppConfig.attributes[DataTypes.FILLING_RATE].filePath,
        AppConfig.observationTypes[ObservationTypes.OPTIC].abbr,
        AppConfig.duration[DurationTypes.PERIOD].abbr) 
    
      const s2 = getSeriePath(
        id,
        info.name,
        AppConfig.attributes[DataTypes.FILLING_RATE].filePath,
        AppConfig.observationTypes[ObservationTypes.OPTIC].abbr,
        AppConfig.duration[DurationTypes.DAY].abbr) 
      
      serieTmp.push(s1)
      serieTmp.push(s2)
      state.seriePath[id]= serieTmp
    },
	},
})

export const { addInformation } = staticLakeSlice.actions

export default staticLakeSlice.reducer
