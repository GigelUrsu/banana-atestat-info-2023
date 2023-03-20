import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAuth = props => {
    const navigate = useNavigate()
    const {currentUser} = useSelector(mapState);

    useEffect(()=>{
        if(!currentUser)
        navigate('/login')
    },[currentUser,navigate])

    return currentUser;
}

export default useAuth;