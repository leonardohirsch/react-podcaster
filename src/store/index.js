import { configureStore } from '@reduxjs/toolkit'
import episodesReducer from './features/episodes/episodesSlice'
import podcastsReducer from './features/podcasts/podcastsSlice'
import routerReducer from './features/router/routerSlice'

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    episodes: episodesReducer,
    router: routerReducer,
  },
})