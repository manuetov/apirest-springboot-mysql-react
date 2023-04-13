import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchAllRecipes = async () => {
    const res = await axios.get("http://localhost:8080/api/post");
    console.log(res.data);
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return recipes.map((recipe, index) => (
    <div key={index}>
      <h1>{recipe.titulo}</h1>
      <p>{recipe.descripcion}</p>
      <p>{recipe.contenido}</p>
      <img src={"http://localhost:8080/api/post/image/get?imagen="+recipe.imagen} alt={recipe.titulo} />
    </div>
  ));
};

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("descripcion", description);
    formData.append("contenido", content);
    formData.append("imagen", file);

    console.log(file);
    axios
      .post("http://localhost:8080/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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
      <img src="http://localhost:8080/api/post/image/get?imagen=6d06887a004e4e988dd98a737e3dff98.jpg"/>
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

// {
//   headers : {
//      "Content-Type": "application/json"
//     }, formData }
