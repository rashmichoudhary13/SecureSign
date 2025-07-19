import React from 'react'
import { useApp } from './AppContext'
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const routeRoles = {
    '/admin': ['admin'],
    '/editor': ['admin','editor'],
    '/adashboard': ['admin'],
    'edashboard': ['admin', 'editor'],
    'product': ['admin','editor','user'],
};

const ProtectedRoute = () => {
    const {isLoggedIn, loading, userData } = useApp();
    const location = useLocation();

    if (loading) return <div>Loading...</div>; 
   
   if (!isLoggedIn) return <Navigate to='/login'/>

   const allowedRole = routeRoles[location.pathname];

   if(allowedRole && !allowedRole.includes(userData.role)){
      return <Navigate to="/" />
   }

   return <Outlet/> ;
}

export default ProtectedRoute;
