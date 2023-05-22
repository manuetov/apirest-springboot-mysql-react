import { useEffect } from 'react'
import { NavBar, CardFavList, FormAdd, Sidebar, CardApiList } from "./components";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from './pages/HomePage'
import UsersPage from "./pages/UsersPage";
import LoginPage from "./components/LoginPage";
import { useAuthContext } from "./context/AuthContext";



function App() {
  return (
    <Router>
      
      <NavBar />
      <Sidebar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/buscar' element={<CardApiList />} /> 
        <Route path='/favorites' element={<CardFavList />} />
        <Route path='/addmeme' element={<FormAdd />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path="*" element={<Error />} /> */}  
      </Routes>

    </Router>
  );
}

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




{/* <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/buscar' element={<CardApiList />} /> 
        <Route path='/favorites' element={<CardFavList />} />
        <Route path='/addmeme' element={<FormAdd />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<Error />} /> 
      </Routes> */}

