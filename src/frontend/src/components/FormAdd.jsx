import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FormAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
        setTitle("");
        setDescription("");
        setContent("");
        setFile(null);
        setPreviewImage(null);
      })
      .catch((error) => {
        console.error(error);
      });
      window.location.reload();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(file));
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
          placeholder="contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="m-2">
        <Form.Control
          type="file"
          onChange={handleFileInputChange}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Imagen seleccionada"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </Form.Group>

      <Button variant="primary" type="submit" className="m-2">
        enviar
      </Button>
    </Form>
  );
};

export default FormAdd;


