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

{
  /* <img src="http://localhost:8080/api/post/image/get?imagen=6d06887a004e4e988dd98a737e3dff98.jpg"/> */
}

//    axios.post("http://localhost:8080/api/post/", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title, description, content }),
//   })
//   .then(res => res.json()).then(data => console.log(data))
//   .catch(err => console.error(err))
//  };

// {
//   headers : {
//      "Content-Type": "application/json"
//     }, formData }
