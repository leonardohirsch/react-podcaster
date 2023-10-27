export const homeReducer = (state, action) => {
    switch (action.type) {
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
      case 'setListToShow': {
        return {
          ...state,
          listToShow: [...action.payload],
        };
      }
      case 'setShowSpinner': {
        return {
          ...state,
          showSpinner: action.payload,
        };
      }
      default:
        return state;
    }
}
export const initialState = {
    doFetchData: false,
    fetchError: false,
    listToShow: [],
    showSpinner: true,
};