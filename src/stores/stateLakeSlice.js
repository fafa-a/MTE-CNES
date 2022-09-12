import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  active:[],
  loaded:[],
}

export const stateLakeSlice = createSlice({
  name : "stateLake",
  initialState,
  reducers: {
    addLake: (state, action) => {
      const { id } = action.payload

      if(!state.active.includes(id)){
        state.active.push(id)
      }

      if(!state.loaded.includes(id)){
        state.loaded.push(id)
      }
    },
    removeLake: (state, action) => {
        const { id } = action.payload

      if(state.active.includes(id)){
      state.active =  state.active.filter(lake => lake !== id)
      } 
    }
  }, 
})


export const { addLake, removeLake } = stateLakeSlice.actions

export default stateLakeSlice.reducer
