import { Link } from "react-router-dom";
import { useNavigateTo } from '../../../utils/useNavigateTo';

export default function PodcastListCard({artist, id, image, name}) {

    const { navigateTo } = useNavigateTo();
    
    return (

        <Link onClick={() => navigateTo(`/podcast/${id}`, true)} >

            <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow h-max mt-20">
        
                <img src={image} alt={name} className="w-9/12 self-center rounded-full -mt-20" />
        
                <h5 className="text-center text-2xl font-bold text-gray-900 mb-2">
                    {name}
                </h5>
        
                <p className="text-center mb-3 font-normal text-gray-700">
                    {artist}
                </p>
        
            </div>

        </Link>
    );
}