import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setEpisodesOfPodcast } from '../../store/features/episodes/episodesSlice'
import { setPodcasts } from '../../store/features/podcasts/podcastsSlice'
import { initialState, podcastReducer } from './podcastReducer'
import Header from '../../components/Header'
import EpisodesList from './components/EpisodesList'
import PodcastEpisodesBar from './components/PodcastEpisodesBar'
import PodcastPageCard from '../../components/PodcastPageCard'
import Spinner from '../../components/Spinner'
import { useFetch } from '../../utils/useFetch'
import { hasUpdatedLocalDb } from '../../utils/'


export default function Podcast() {

    const { podcastId } = useParams();
    const [ state, dispatchLocal ] = useReducer( podcastReducer, initialState );
    const { checkPodcastDb, doFetchData, fetchError, isPodcast, listToShow, podcastData } = state;
    const dispatchStore = useDispatch();
    const podcastsStore = useSelector( (store) => store.podcasts.podcasts );
    const { getData } = useFetch();

    useEffect(() => {

        if ( podcastsStore.length === 0 ) {

            if ( hasUpdatedLocalDb("podcasts") ){
                
                const localDb = { ...JSON.parse(localStorage.getItem("podcasts")) }
                
                dispatchStore( setPodcasts( localDb.podcasts ));

            }

            dispatchLocal({ type: 'setCheckPodcastDb', payload: true});
        }

    }, []);

    useEffect(() => {
        
        const podcast = podcastsStore.find( podcast => podcast?.id === podcastId);

        if (podcast){

            dispatchLocal({ type: 'setPodcastData', payload: {...podcast} });

            dispatchLocal({ type: 'setIsPodcast', payload: true });

            dispatchLocal({ type: 'setCheckPodcastDb', payload: true });
        }

    }, [podcastsStore]);

    useEffect(() => {
        if (isPodcast){
            if ( hasUpdatedLocalDb("episodes") ){

                const localDb = { ...JSON.parse(localStorage.getItem("episodes")) }
                
                dispatchStore( setEpisodesOfPodcast( localDb.episodes ));
                
                const episodesOfPodcast = localDb.episodes.filter( episode => episode.podcastId === podcastId);
                
                if (episodesOfPodcast.length > 0) {

                    dispatchLocal({ type: 'setListToShow', payload: [...episodesOfPodcast] });

                } else{

                    dispatchLocal ( { type: 'setDoFetchData', payload: true} );
            
                }
            
            }

        } else {
            
            dispatchLocal ( { type: 'setDoFetchData', payload: true } );
        
        }
      }, [isPodcast]);

      useEffect(() => {

        const abortController = new AbortController();
    
        if (isPodcast && doFetchData) {

          getData(import.meta.env.VITE_EPISODES_URL+podcastId, abortController)
            .then( ({ fetchData, fetchError, fetchSuccess}) => {

                if (fetchError) {

                    dispatchLocal({ type: 'setFetchError', payload: true });
                    console.log (fetchError)
                    return;

                }

                fetchData.results.shift()
            
                const episodesFiltered = fetchData.results.map( episode => {
                
                  return {
                    description:     episode.description,
                    trackId:         episode.trackId,
                    trackName:       episode.trackName,
                    podcastId:       podcastId,
                    previewUrl:      episode.previewUrl,
                    releaseDate:     episode.releaseDate,
                    trackTimeMillis: episode.trackTimeMillis
                  };    
                });
            
                const db = {
                  savedAt: Date.now(),
                  episodes: episodesFiltered
                };
            
                localStorage.setItem("episodes", JSON.stringify(db));
            
                dispatchStore( setEpisodesOfPodcast( episodesFiltered ));
    
                dispatchLocal({ type: 'setListToShow', payload: [...episodesFiltered] });
              
            })
        }
    
        return () => abortController.abort();
    
      }, [doFetchData]);
    
    return (
        <>
            <Header topSpinner = { true } />

            { !isPodcast && checkPodcastDb && 
                <h1 className='text-red-600'>Lo siento, Podcast Inexistente</h1> }

            { fetchError && !isPodcast &&
                <h2 className='text-red-600'>Lo siento, se produjo un error.</h2>
            }

            { isPodcast &&
                <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                    
                    <div>
                        <PodcastPageCard 
                            artist =    { podcastData.artist }
                            id =        { podcastData.id }
                            image =     { podcastData.image }
                            name =      { podcastData.name }
                            summary =   { podcastData.summary }
                            topSpinner = { false }
                            />
                    </div>

                    <div className="col-span-2">

                        <div className='flex flex-col gap-3'>

                        { !fetchError && listToShow.length === 0 &&
                            <div className="flex flex-col items-center">
                                <Spinner />
                            </div>
                        }

                        { fetchError &&
                            <h2 className='text-red-600'>Lo siento, se produjo un error.</h2>
                        }

                        { listToShow.length>0 && 
                            <>
                            <PodcastEpisodesBar total={listToShow.length} />
                            <EpisodesList list={listToShow} listId={podcastId} />
                            </>
                            }

                        </div>

                    </div>
                    
                </div>
            }
        
        </>
    );
}