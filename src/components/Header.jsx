import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { setSpinner } from '../store/features/router/routerSlice';
import Spinner from "./Spinner";
import { useNavigateTo } from '../utils/useNavigateTo';



export default function Header({topSpinner}) {

    const dispatchStore = useDispatch();
    const spinnerStore = useSelector( (store) => store.router.spinner );
    const { navigateTo } = useNavigateTo();

    useEffect(() => {
        
        dispatchStore( setSpinner( false ));
        
      }, []);

    return (
        <div className="my-5">

            <div className="flex justify-between mb-2">

                <Link onClick={() => navigateTo(`/`, topSpinner)}>

                    <h1 className="inline-block text-xl text-blue-600 font-bold">Podcaster</h1>
                    
                </Link>

                 { spinnerStore && <Spinner />}
                
            </div>
            
            <hr />

        </div>
    );
}