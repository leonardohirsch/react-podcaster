import { Link } from "react-router-dom";
import { formatDate, msToMS } from "../../../utils";
import { useNavigateTo } from '../../../utils/useNavigateTo';

export default function EpisodesList({list, listId}) {

    const { navigateTo } = useNavigateTo();
    
    return (

        <table className="w-full table-auto text-left text-gray-500">

            <thead className="text-xs text-gray-700">

                <tr>
                    <th scope="col" className="text-base px-2 py-2">
                        Title
                    </th>
                    <th scope="col" className="text-base px-2 py-2">
                        Date
                    </th>
                    <th scope="col" className="text-base px-2 py-2">
                        Duration
                    </th>
                </tr>

            </thead>

            <tbody className="text-sm">

                {
                    list.map( (item, key) => {
                        return (
                        <>
                        <tr className={`${key%2 === 0 ? "bg-gray-50" : "bg-white"} border-b`} key = { item.trackId } >

                            <th scope="row" className="px-6 py-4 font-medium text-blue-700">
                                
                                <Link onClick={() => navigateTo(`/podcast/${listId}/episode/${item.trackId}`, true)}>
                                    { item.trackName }
                                </Link>

                            </th>

                            <td className="px-2 py-2 whitespace-nowrap">
                                { formatDate(item.releaseDate) }
                            </td>

                            <td className="px-2 py-2">
                                { msToMS(item.trackTimeMillis) }
                            </td>
                            
                        </tr>
                        </>
                    )})
                }
            </tbody>

        </table>
    );
}