import { createSlice } from '@reduxjs/toolkit'

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState: {
    podcasts: [],
  },
  reducers: {
    setPodcasts:(state, {payload})=> {
        state.podcasts = [...payload];
    },
  },
})

export const { setPodcasts } = podcastsSlice.actions

export default podcastsSlice.reducer