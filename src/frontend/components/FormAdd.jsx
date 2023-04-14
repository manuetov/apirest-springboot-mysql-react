import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FormAdd = () => {
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
    <Form onSubmit={handleSubmit} className="m-2">
      <Form.Group className="m-2">
        <Form.Control
          type="text"
          placeholder="titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="m-2">
        <Form.Control 
          type="text"
          placeholder="descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="m-2">
        <Form.Control
          type="text"
          placeholder="descripción"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="m-2">
        <Form.Control
          type="file"
          // size="lg"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="m-2">
        enviar
      </Button>
    </Form>
  );
};

export default FormAdd;

{
  /* <label>
         Descripcion:
         <input
           type="text"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
         />
       </label>
       <label>
         Contentido:
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
         />
       </label>
       <label>
         File:
         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
       </label>
       <button type="submit">Submit</button> */
}
