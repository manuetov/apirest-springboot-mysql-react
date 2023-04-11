import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiRecipes = () => {
   const [ recipes, setRecipes ] = useState([])

   const fetchAllRecipes = () => {
      axios.get("http://localhost:8080/api/post").then(res => {
         console.log(res)
         setRecipes(res.data)
      })
   }

   useEffect(() => {
      fetchAllRecipes()
   }, [])

   return recipes.map((recipe, index) => (
    <div key={index}>
      <h1>{recipe.titulo}</h1>
      <p>{recipe.description}</p>
      <p>{recipe.contenido}</p>
    </div>
   ))
}

const Form = () => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [content, setContent] = useState('');
   const [file, setFile] = useState(null);
 
   const handleSubmit = (e) => {
     e.preventDefault();

     const formData = new FormData();
     formData.append('titulo', title);
     formData.append('descripcion', description);
     formData.append('contenido', content);
     formData.append('imagen', file);
 
 console.log(file)
     axios.post('http://localhost:8081/api/post/', {
          method: 'POST',
          headers: { "Content-Type": "multipart/form-data" }, data:formData })
       .then(response => {
         console.log(response.data);
       })
       .catch(error => {
         console.error(error);
       });
   };
 
   return (
     <form onSubmit={handleSubmit}>
       <label>
         Title:
         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
       </label>
       <label>
         Description:
         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
       </label>
       <label>
         Content:
         <textarea value={content} onChange={(e) => setContent(e.target.value)} />
       </label>
       <label>
         File:
         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
       </label>
       <button type="submit">Submit</button>
     </form>
   );
 };
 



function App() {
   return (
     <div className="App">
       <h1>Chicote pega el bote!!</h1>
       <ApiRecipes />
       <Form />
     </div>
   );
 }
 
 export default App;



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
