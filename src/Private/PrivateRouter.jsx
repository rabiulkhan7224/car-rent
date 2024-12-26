import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';

const PrivateRouter = ({children}) => {
    const {user,loader}=useContext(AuthContext)
    const location = useLocation()

  
  if (user) return children
  return <Navigate to='/login' state={location.pathname} />
}

export default PrivateRouter;