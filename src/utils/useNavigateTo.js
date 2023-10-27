import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setSpinner } from '../store/features/router/routerSlice';

export const useNavigateTo = ( ) => {

    const dispatchStore = useDispatch();

    const navigate = useNavigate();

    const navigateTo = ( route, showSpinner ) =>{
        
        if (showSpinner) dispatchStore( setSpinner( true ));

        setTimeout(()=>navigate(route), 500);

    }
    
    return { navigateTo }
}