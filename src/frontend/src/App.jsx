import { CardFavList, FormAdd, CardApiList, NavBar, Sidebar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

import { LoginPage } from "./auth/pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import { UserRoutes } from "./routes/UserRoutes";
import { RegisterPage } from "./pages/RegisterPage";


export const App = () => {
  const { login } = useAuthContext();

  return (
    <>
      <NavBar />
      <Sidebar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/buscar" element={<CardApiList />} />

        {/* Rutas privadas */}
        {login.isAuth ? (
          <>
            <Route path="/favorites" element={<CardFavList />} />
            <Route path="/addmeme" element={<FormAdd />} />
            {login.isAdmin && (
              <Route path="/users/*" element={<UserRoutes />} />
            )}
          </>
        ) : (
          <>
            <Route path="/favorites" element={<LoginPage />} />
            <Route path="/addmeme" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

// const PrivateRoute = ({ children }) => {
//     const { logged } = useAuthContext()
//     const navigate = useNavigate()

//     useEffect(() => {
//       if (!logged) {
//         navigate('/login')
//       }
//     }, [logged, navigate])

//     return children
//   }

// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <Sidebar />

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/buscar" element={<CardApiList />} />
//         <Route path="/login" element={<LoginPage />} />

//         <Route element={<PrivateRoute />}>

//           <Route path="/favorites" element={<CardFavList />} />
//           <Route path="/addmeme" element={<FormAdd />} />
//           <Route path="/users" element={<UsersPage />} />
//         </Route>

//       </Routes>
//     </Router>
//   );
// }

{
  /* <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/buscar' element={<CardApiList />} /> 
        <Route path='/favorites' element={<CardFavList />} />
        <Route path='/addmeme' element={<FormAdd />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<Error />} /> 
      </Routes> */
}
