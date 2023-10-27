import { Link } from "react-router-dom";
import { useNavigateTo } from '../utils/useNavigateTo';

export default function PodcastPageCard({artist, id, image, name, summary, topSpinner}) {

    const { navigateTo } = useNavigateTo();
    
    return (

        <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow h-max">

            <Link onClick={() => navigateTo(`/podcast/${id}`, topSpinner)} className="self-center">

                <img src={image} alt={name} className="max-w-full self-center rounded" />

            </Link>
            
            <hr className="my-2" />

            <div className="py-2">

                <h5 className="text-lg font-bold text-gray-900">

                    <Link onClick={() => navigateTo(`/podcast/${id}`, topSpinner)}>
                        {name}
                    </Link>

                </h5>

                <span className="text-base italic text-gray-900">

                    <Link onClick={() => navigateTo(`/podcast/${id}`, topSpinner)}>
                        by {artist}
                    </Link>

                </span>

            </div>
            
            <hr className="my-2" />
            
            <div className="py-2">

                <h6 className="text-base font-bold text-gray-900">
                    Description:
                </h6>

                <p className="text-base italic text-gray-700 break-normal">
                    {summary}
                </p>

            </div>
            
        </div>
    );
}