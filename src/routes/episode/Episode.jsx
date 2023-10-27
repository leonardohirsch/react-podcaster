import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setEpisodes } from '../../store/features/episodes/episodesSlice'
import { setPodcasts } from '../../store/features/podcasts/podcastsSlice'
import { initialState, episodeReducer } from './episodeReducer'
import EpisodeDetail from './components/EpisodeDetail';
import Header from '../../components/Header'
import PodcastPageCard from '../../components/PodcastPageCard'
import { hasUpdatedLocalDb } from '../../utils/'

export default function Episode() {
    const { episodeId, podcastId } = useParams();
    const [ state, dispatchLocal ] = useReducer( episodeReducer, initialState );
    const { checkEpisodesDb, checkPodcastDb, episodeData, isEpisode, isPodcast, podcastData } = state;
    const dispatchStore = useDispatch();
    const podcastsStore = useSelector( (store) => store.podcasts.podcasts );
    const episodesStore = useSelector( (store) => store.episodes.episodes );

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

        if ( episodesStore.length === 0 ) {

            if ( hasUpdatedLocalDb("episodes") ){
                
                const localDb = { ...JSON.parse(localStorage.getItem("episodes")) }
                
                dispatchStore( setEpisodes( localDb.episodes ));

            }

            dispatchLocal({ type: 'setCheckEpisodesDb', payload: true});
        }

    }, []);
    

    useEffect(() => {
                
            const episodesOfPodcast = episodesStore.filter( episode => episode.podcastId === podcastId);

            const episode = episodesOfPodcast.find( episode => episode.trackId === parseInt(episodeId) )
                
            if ( episode ) {

                dispatchLocal({ type: 'setEpisodeData', payload: {...episode} });

                dispatchLocal({ type: 'setIsEpisode', payload: true });

            }

            dispatchLocal({ type: 'setCheckEpisodesDb', payload: true});

      }, [episodesStore]);
    

      return (
        <>
            <Header topSpinner = { true } />

            { ( (!isPodcast && checkPodcastDb) || (!isEpisode && checkEpisodesDb) ) &&
                <h1 className='text-red-600'>Lo siento, Episodio Inexistente</h1>
            }

            { isPodcast && isEpisode &&
                <div className="flex flex-col md:grid md:grid-cols-3 gap-4">

                    <div>
                        <PodcastPageCard 
                            artist =    { podcastData.artist }
                            id =        { podcastData.id }
                            image =     { podcastData.image }
                            name =      { podcastData.name }
                            summary =   { podcastData.summary }
                            topSpinner = { true }
                            />
                    </div>

                    <div className="col-span-2">
                        <EpisodeDetail data={ episodeData } />
                    </div>
                    
                </div>
            }
        
        </>
    );
}