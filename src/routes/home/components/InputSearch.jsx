export default function InputSearch({search}) {
    
    return (
        <>
            <input
                type="text" 
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg sm:w-2/5 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder="Filter podcasts..."
                onChange={ search }
            />
        </>
    );
}