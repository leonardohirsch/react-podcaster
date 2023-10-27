export const podcastReducer = (state, action) => {
    switch (action.type) {
      case 'setCheckPodcastDb': {
        return {
          ...state,
          checkPodcastDb: action.payload,
        };
      }
      case 'setDoFetchData': {
        return {
          ...state,
          doFetchData: action.payload,
        };
      }
      case 'setFetchError': {
        return {
          ...state,
          fetchError: action.payload,
        };
      }
      case 'setIsPodcast': {
        return {
          ...state,
          isPodcast: action.payload,
        };
      }
      case 'setListToShow': {
        return {
          ...state,
          listToShow: [...action.payload],
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
    checkPodcastDb: false, 
    doFetchData: false,
    fetchError: false,
    isPodcast: false,
    listToShow: [],
    podcastData: {
      artist:'',
      id: '',
      image:'',
      name:'',
      summary:'',
    },
};