import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";


const CardPostList = () => {
  const [memes, setMeme] = useState([]);
  const img_URL = "http://localhost:8080/api/post/image/get?imagen=";


  const fetchAllMemes = async () => {
    const res = await axios.get("http://localhost:8080/api/post");
    console.log(res.data);
    setMeme(res.data);
  }

  useEffect(() => {
    fetchAllMemes();
  }, []);
  
  const deleteMeme = async (id) => {
    await axios.delete(`http://localhost:8080/api/post/${id}`)
    window.location.reload();
  }

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
              src={`${img_URL}` + `${meme.imagen}`}
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
              onClick={()=> deleteMeme(meme.id)}
            >
              borrar
            </Button>

            <Button variant="success">actualizar</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardPostList;
