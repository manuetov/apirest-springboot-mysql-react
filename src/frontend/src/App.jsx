import { NavBar, CardPostList, FormAdd, Sidebar, CardApiList } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      
      <NavBar />
      <Sidebar />
      
      <Routes>
        <Route path='/buscar' element={<CardApiList />} /> 
        <Route path='/favourites' element={<CardPostList />} />
        <Route path='/addmeme' element={<FormAdd />} />
        {/* <Route path="*" element={<Error />} /> */}  
      </Routes>

    </Router>
  );
}

export default App;

