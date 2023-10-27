export const episodeReducer = (state, action) => {
    switch (action.type) {
      case 'setCheckEpisodesDb': {
        return {
          ...state,
          checkEpisodesDb: action.payload,
        };
      }
      case 'setCheckPodcastDb': {
        return {
          ...state,
          checkPodcastDb: action.payload,
        };
      }
      case 'setEpisodeData': {
        return {
          ...state,
          episodeData: {...action.payload},
        };
      }
      case 'setIsEpisode': {
        return {
          ...state,
          isEpisode: action.payload,
        };
      }
      case 'setIsPodcast': {
        return {
          ...state,
          isPodcast: action.payload,
        };
      }
      case 'setPodcastData': {
        return {
          ...state,
          podcastData: {...action.payload},
        };
      }
      default:
        return state;
    }
}
export const initialState = {
    checkEpisodesDb: false,
    checkPodcastDb: false, 
    episodeData: {

    },
    isEpisode: false,
    isPodcast: false,
    podcastData: {
      artist:'',
      id: '',
      image:'',
      name:'',
      summary:'',
    },
};