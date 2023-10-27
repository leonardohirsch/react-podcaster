export default function PodcastEpisodesBar({total}) {
    
    return (
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow h-max">

            <h2 className="text-lg font-bold text-gray-900">
                Episodes: {total}
            </h2>
            
        </div>
    );
}