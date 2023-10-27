export default function EpisodeDetail ({data}) {
    
    return (
        <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow h-max">
            
            <h2 className="text-xl font-bold">{ data.trackName}</h2>
            
            <div className="py-2">

                <p className="text-base italic text-gray-700 break-normal">
                    { data.description }
                </p>

            </div>

            <div className="py-2">

                <audio className="w-full" src={data.previewUrl} controls></audio>

            </div>
            
        </div>
    );
}