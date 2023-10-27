import { createSlice } from '@reduxjs/toolkit'

export const routerSlice = createSlice({
  name: 'router',
  initialState: {
    spinner: false,
  },
  reducers: {
    setSpinner:(state, {payload})=> {
        state.spinner = payload;
    },
  },
})

export const { setSpinner } = routerSlice.actions

export default routerSlice.reducer