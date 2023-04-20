import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

import axios from "axios";
import React, { useState, useEffect } from "react";

const CardFavList = () => {
  const [memes, setMeme] = useState([]);
  const img_URL = "http://localhost:8080/api/post/image/get?imagen=";

  const [editingMeme, setEditingMeme] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const [formVisible, setFormVisible] = useState(false);

  // estado para indicar si el cursor está sobre la tarjeta
  // const [isHovered, setIsHovered] = useState(false);

  // para almacenar el índice de la card que tiene el ratón encima
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const fetchAllMemes = async () => {
    const res = await axios.get("http://localhost:8080/api/post");
    console.log(res.data);
    setMeme(res.data);
  };

  useEffect(() => {
    fetchAllMemes();
  }, []);

  // borrar
  const deleteMeme = async (id) => {
    await axios.delete(`http://localhost:8080/api/post/${id}`);
    window.location.reload();
  };

  // actualizar
  const handleUpdateMeme = async (e, id, setFormVisible) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/post/${id}`, {
      titulo: updatedTitle,
      descripcion: updatedDescription,
      contenido: updatedContent,
    });
    // seteo el estado
    setMeme((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id == id
          ? {
              ...meme,
              titulo: updatedTitle || null,
              // descripcion: updatedDescription || null,
              // contenido: updatedContent || null,
            }
          : meme
      )
    );
    setUpdatedTitle('')
    setEditingMeme(null);
    setFormVisible(false);
  };

  return (
    <div className="cardPostList d-flex flex-wrap ">
      <GifCards>
        {memes.map((meme, index) => (
          <GifCard 
            key={index}
            onMouseEnter={() => setHoveredIndex(index)} // Manejar evento onMouseEnter para indicar que el cursor está sobre la tarjeta
            onMouseLeave={() => setHoveredIndex(-1)} // Manejar evento onMouseLeave para indicar que el cursor ya no está sobre la tarjeta
            // isHovered={isHovered} // Paso el estado isHovered como prop a la componente GifCard
            // setIsHovered={setIsHovered} // Paso la función setIsHovered como prop a la componente GifCard
          >
            <GifImage src={`${img_URL}${meme.imagen}`} alt={meme.titulo} />
            <GifTitle >{meme.titulo}</GifTitle>
            {/* <GifContent >{meme.contenido}</GifContent>
            <GifDescription >{meme.descripcion}</GifDescription> */}
            <GifActions className="gif-actions">
            {hoveredIndex === index && ( // Mostrar los botones de borrar y actualizar sólo si isHovered es true
                <>
              <button
                size="sm"
                variant="danger"
                className="m-1"
                onClick={() => deleteMeme(meme.id)}
              >
                borrar
              </button>

              <button
                size="sm"
                variant="success"
                className="m-1"
                onClick={() => setEditingMeme(meme)}
              >
                actualizar
              </button>
              </>
            )}
              {/* {console.log(meme,editingMeme,editingMeme && editingMeme.Id === meme.id )} */}
              {hoveredIndex === index && editingMeme && editingMeme.id === meme.id && (
                <Form
                  onSubmit={(e) => handleUpdateMeme(e, meme.id, setFormVisible)}
                >
                  <Form.Group className="m-2">
                    <Form.Control
                      type="text"
                      placeholder="titulo"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  </Form.Group>

                  {/* <Form.Group className="m-2">
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
                  </Form.Group> */}

                  <button
                    variant="primary"
                    type="submit"
                    size="sm"
                    className="m-2"
                  >
                    guardar
                  </button>
                </Form>
              )}
            </GifActions>
          </GifCard>
        ))}
      </GifCards>
    </div>
  );
};

const GifCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GifCard = styled.div`
  margin: 10px;
  margin-bottom: 100px;
  width: 200px;
  height: 300px;
  position: relative;
`;

const GifImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 5px;
`;

const GifTitle = styled.h3`
  position: absolute;
  bottom: 20.5%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 10px;
  font-size: 1.2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 5px 5px;
  transform: translateY(100%);
  transition: transform 0.2s ease-in-out;
`;

// const GifContent = styled.h4`
//   position: absolute;
//   bottom: 10%;
//   left: 0;
//   width: 100%;
//   margin: 0;
//   padding: 10px;
//   font-size: 1.2rem;
//   color: white;
//   background-color: rgba(0, 0, 0, 0.7);
//   border-radius: 0 0 5px 5px;
//   transform: translateY(100%);
//   transition: transform 0.2s ease-in-out;
// `;

// const GifDescription = styled.h4`
//   position: absolute;
//   bottom: -1%;
//   left: 0;
//   width: 100%;
//   margin: 0;
//   padding: 10px;
//   font-size: 1.2rem;
//   color: white;
//   background-color: rgba(0, 0, 0, 0.7);
//   border-radius: 0 0 5px 5px;
//   transform: translateY(100%);
//   transition: transform 0.2s ease-in-out;
// `;

const GifActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: opacity 0.2s ease-in-out, transform 0.4s ease-in-out;
  & > * {
    margin: 5px;
  }
  & > button {
    border: none;
    background-color: transparent;
    color: #ce07b3;
    padding: 3px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(37, 61, 61);
      color: white;
    }
  }
`;
export default CardFavList;
