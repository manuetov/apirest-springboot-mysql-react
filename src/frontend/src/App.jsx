import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiRecipes = () => {
   const [ recipes, setRecipes ] = useState([])

   const fetchAllRecipes = () => {
      axios.get("http://localhost:8080/api/post", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      }).then(res => {
         console.log(res)
         setRecipes(res.data)
      })
   }

   useEffect(() => {
      fetchAllRecipes()
   }, [])
}

const Form = () => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [content, setContent] = useState('');
   const [file, setFile] = useState(null);
 
   const handleSubmit = (e) => {
     e.preventDefault();
     axios.post("http://localhost:8080/api/post/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, content }),
    })
    .then(res => res.json()).then(data => console.log(data))
    .catch(err => console.error(err))
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
       <h1>hola</h1>
       <ApiRecipes />
       <Form />
     </div>
   );
 }
 
 export default App;
