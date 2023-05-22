// HOC => children. Si esta autenticado paso/muestro children, en caso contrario navigate login

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ path, redirectTo, children }) => {
  const { logged } = useAuthContext();

  return logged ? (
    <Route path={path} element={children} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;






// import React, {useState} from 'react'
// import { useAuthContext } from './context/AuthContext'
// import { Navigate, useNavigate } from 'react-router-dom'

// export const PrivateRoute = ({ children }) => {
//     const { logged } = useAuthContext()
//     const navigate = useNavigate()
  
//     useEffect(() => {
//       if (!logged) {
//         navigate('/login')
//       }
//     }, [logged, navigate])
  
//     return children
//   }

// export const PrivateRoute = ({ children }) => {
//     const { logged } = useAuthContext()


//     const [redirected, setRedirected] = useState(false);

//     if (!logged && !redirected) {
//       setRedirected(true);
//       return <Navigate to='/login' replace />;
//     }
    
//     return children
// }

