import { NavBar, CardFavList, FormAdd, Sidebar, CardApiList } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  HomePage from './pages/HomePage'

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
        {/* <Route path="*" element={<Error />} /> */}  
      </Routes>

    </Router>
  );
}

export default App;

