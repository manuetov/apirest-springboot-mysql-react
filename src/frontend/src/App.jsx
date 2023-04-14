import FormAdd from "../components/FormAdd"
import NavBar from "../components/NavBar"
import CardPostList from "../components/CardPostList"


function App() {
  return (
    <Container-fluid>
      <NavBar />
      <CardPostList />
      <FormAdd />
    </Container-fluid>
  );
}

export default App;

{/* <img src="http://localhost:8080/api/post/image/get?imagen=6d06887a004e4e988dd98a737e3dff98.jpg"/> */}

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
