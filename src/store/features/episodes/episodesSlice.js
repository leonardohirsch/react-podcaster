import { createSlice } from '@reduxjs/toolkit'

export const episodesSlice = createSlice({
  name: 'episodes',
  initialState: {
    episodes: [],
  },
  reducers: {
    setEpisodes:(state, {payload})=> {
        state.episodes = [...payload];
    },
    setEpisodesOfPodcast:(state, {payload})=> {
      const episodesFiltered = state.episodes.filter( episode => {
        return episode.podcastId !== payload[0].podcastId;
      })
      state.episodes = [...episodesFiltered, ...payload];
  },
  },
})

export const { setEpisodes, setEpisodesOfPodcast } = episodesSlice.actions

export default episodesSlice.reducer