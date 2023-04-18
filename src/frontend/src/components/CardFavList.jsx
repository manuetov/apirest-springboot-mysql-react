import Card from "react-bootstrap/Card";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import React, { useState, useEffect } from "react";

const CardFavList = () => {
  const [memes, setMeme] = useState([]);
  const img_URL = "http://localhost:8080/api/post/image/get?imagen=";

  const [editingMeme, setEditingMeme] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const fetchAllMemes = async () => {
    const res = await axios.get("http://localhost:8080/api/post");
    console.log(res.data);
    setMeme(res.data);
  };

  useEffect(() => {
    fetchAllMemes();
  }, []);

  const deleteMeme = async (id) => {
    await axios.delete(`http://localhost:8080/api/post/${id}`);
    window.location.reload();
  };

  const handleUpdateMeme = async (e, id) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/post/${id}`, {
      titulo: updatedTitle,
      descripcion: updatedDescription,
      contenido: updatedContent,
    }); 
    // seteo el estado
    setMeme((prevMemes) => 
      prevMemes.map((meme) => 
        meme.id == id ? {
          ...meme,
          titulo: updatedTitle,
          descripcion: updatedDescription,
          contenido: updatedContent
        } : meme
      )
    )
  };

  return (
    <div className="cardPostList d-flex flex-wrap ">
      {memes.map((meme, index) => (
        <Card
          key={index}
          className="card m-2 mx-auto"
          style={{ width: "14rem" }}
        >
          <Card.Body className="text-center">
            <Card.Title className="fs-4 pb-2 fw-bold text-danger">
              {meme.titulo}
            </Card.Title>
            <Card.Img
              style={{ height: "12rem" }}
              src={`${img_URL}${meme.imagen}`}
              alt={meme.titulo}
              className="mb-2"
            />
            <Card.Subtitle className="fs-5 pb-2 text-warning">
              {meme.descripcion}
            </Card.Subtitle>
            <Card.Text className="mb-5">{meme.contenido}</Card.Text>

            <Button
              variant="danger"
              className="m-1"
              onClick={() => deleteMeme(meme.id)}
            >
              borrar
            </Button>

            <Button
              variant="success"
              className="m-1"
              onClick={() => setEditingMeme(meme)}
            >
              actualizar
            </Button>
          {/* {console.log(meme,editingMeme,editingMeme && editingMeme.Id === meme.id )} */}
          {editingMeme && editingMeme.id === meme.id && (
          
          <Form onSubmit={(e) => handleUpdateMeme(e, meme.id)}>
            <Form.Group className="m-2">
              <Form.Control
                type="text"
                placeholder="titulo"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="m-2">
              <Form.Control
                type="text"
                placeholder="descripcion"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="m-2">
              <Form.Control
                type="text"
                placeholder="contenido"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="m-2">
              guardar
            </Button>
          </Form>
          )}

          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardFavList;
