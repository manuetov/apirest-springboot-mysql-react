// HOC => children. Si no esta autenticado paso/muestro children, en caso contrario navigate login

import React, {useState} from 'react'
import { useAuthContext } from './context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'


// export const PublicRoute = ({ children }) => {
//     const { logged } = useAuthContext()
//     const navigate = useNavigate()
  
//     React.useEffect(() => {
//       if (logged) {
//         navigate('/users')
//       }
//     }, [logged, navigate])
  
//     return children
//   }
  
export const PublicRoute = ({ children }) => {
    const { logged } = useAuthContext()
    const [redirected, setRedirected] = useState(false);

    if (logged && !redirected) {
      setRedirected(true);
      return <Navigate to='/users' replace />;
    }
  
    return children;

}
