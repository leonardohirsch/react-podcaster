import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from '../../store/features/podcasts/podcastsSlice'
import { initialState, homeReducer } from './homeReducer'
import Header from '../../components/Header'
import InputSearch from './components/InputSearch'
import PodcastListCard from './components/PodcastListCard'
import Spinner from '../../components/Spinner'
import { useFetch } from '../../utils/useFetch'
import { hasUpdatedLocalDb } from '../../utils/'


function Home() {
  const [ state, dispatchLocal ] = useReducer( homeReducer, initialState );
  const { doFetchData, fetchError, listToShow, showSpinner } = state;
  const dispatchStore = useDispatch();
  const podcastsStore = useSelector( (store) => store.podcasts.podcasts );
  const { getData } = useFetch();

  const filterPodcastsByInput = ( query ) => {

    const searchResult = podcastsStore.filter( podcast => {
      return ( 
        podcast.name.toLowerCase().includes(query) ||
        podcast.artist.toLowerCase().includes(query)
        )
    });

    dispatchLocal({ type: 'setListToShow', payload: [...searchResult] });

  }

  const resetSearch = () =>{

    dispatchLocal({ type: 'setListToShow', payload: [...podcastsStore] });

  }

  const search = (e) =>{

    const query = e.target.value.toLowerCase().trim();

    if ( query.length === 0 ){
      resetSearch();
      return;
    }

    filterPodcastsByInput(query);
  }
  

  useEffect(() => {

    if ( hasUpdatedLocalDb("podcasts") ){

        const localDb = { ...JSON.parse(localStorage.getItem("podcasts")) }
        
        dispatchStore( setPodcasts( localDb.podcasts ));

        dispatchLocal({ type: 'setListToShow', payload: [...localDb.podcasts] });

        dispatchLocal({ type: 'setShowSpinner', payload: false });

    } else {
        
        dispatchLocal ( { type: 'setDoFetchData', payload: true } );

    }

  }, []);

  useEffect(() => {

    const abortController = new AbortController();

    if (doFetchData) {
      getData(import.meta.env.VITE_PODCASTS_URL, abortController)
        .then( ({ fetchData, fetchError, fetchSuccess}) => {

          if (fetchError) {

            dispatchLocal({ type: 'setFetchError', payload: true });
            console.log (fetchError)
            return;

          }

          const podcastFiltered = fetchData.feed.entry.map( podcast => {
      
            return {
              artist: podcast['im:artist'].label,
              id:     podcast.id.attributes['im:id'],
              image:  (podcast['im:image'][2]) ? podcast['im:image'][2].label :  podcast['im:image'][0].label,
              name: podcast['im:name'].label,
              summary: podcast['summary'].label,
            };
            
          });
        
          const db = { savedAt: Date.now(), podcasts: podcastFiltered };
      
          localStorage.setItem("podcasts", JSON.stringify(db));
      
          dispatchStore( setPodcasts( podcastFiltered ));
      
          dispatchLocal({ type: 'setListToShow', payload: [...podcastFiltered] });
      
          dispatchLocal({ type: 'setShowSpinner', payload: false });
        })
    }

    return () => abortController.abort();

  }, [doFetchData]);

  return (
    <>
      <Header topSpinner = { false } />

      <div className="flex flex-row gap-2 items-center justify-end mx-auto my-10">

      { podcastsStore.length >0 && (
        <>
          <span className="inline-block rounded-full bg-blue-600 text-xl text-white font-bold p-1">
            {podcastsStore.length}
          </span>
        </>
      )}

        <InputSearch search={ search } />

      </div>
     
      { !fetchError && listToShow.length === 0 && showSpinner &&
            <div className="flex flex-col items-center">
                <Spinner />
            </div>
      }
      { fetchError &&
            <div className="flex flex-col items-center">
                <h2 className="text-red-600">Lo siento, se produjo un error.</h2>
            </div>
      }
     
      { listToShow.length>0 &&
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-5 mx-auto">
                {
                listToShow.map( podcast => {

                    return (
                    <>  
                        <PodcastListCard
                          artist =  { podcast.artist }
                          id =      { podcast.id }
                          image =   { podcast.image }
                          name =    { podcast.name }
                          key =     { podcast.id }
                          />
                    </>
                    )

                })
                }
            </div>
        }
      
    </>
  )
}

export default Home
