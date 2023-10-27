export const useFetch = ( ) => {

    const getData = async ( url, abortController) => {

        let fetchData = {};
        let fetchError = null;
        let fetchIsPending = true;
        let fetchSuccess = false;
  
        try {
            const response = await fetch(url, { signal: abortController.signal });
      
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              throw new Error(message);
            }
          
            fetchData = await response.json();
            fetchIsPending = false;
            fetchSuccess = true;
            return { fetchData, fetchError, fetchIsPending, fetchSuccess}
        
        } catch (error) {

            fetchError = error.message;
            fetchIsPending =false;

            return { fetchData, fetchError, fetchIsPending, fetchSuccess}

        }

      }
    
    return { getData }
}