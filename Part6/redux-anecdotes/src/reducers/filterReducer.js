import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name:'filter',
  initialState:'',
  reducers :{
    createFilter(state, action){
      state = action.payload
      return state
    }
  
  }
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer