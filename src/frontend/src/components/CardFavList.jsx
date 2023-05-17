// 1. CRUD backend

import { Form, Button, Alert } from "react-bootstrap";
import styled from "styled-components";

import axios from "axios";
import React, { useState, useEffect } from "react";
import PageHero from "./PageHero";
import Footer from "./Footer";

const CardFavList = () => {
  const [memes, setMeme] = useState([]);
  const img_URL = "http://localhost:8080/api/post/image/get?imagen=";

  const [editingMeme, setEditingMeme] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [formVisible, setFormVisible] = useState(false);

  // para almacenar el índice de la card que tiene el ratón encima
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // guarda la posición del toast en la pantalla
  const [toastPosition, setToastPosition] = useState({
    top: undefined,
  });

  const fetchAllMemes = async () => {
    try {
      const res = await axios
        .get("http://localhost:8080/api/post")
        .then((res) => setMeme(res.data))
        .catch((error) => console.error(error));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllMemes();
  }, []);

  // Invertir el orden del arreglo de memes
  const invertedMemes = [...memes].reverse();

  // borrar
  const deleteMeme = async (id) => {
    await axios.delete(`http://localhost:8080/api/post/${id}`);
    setShowToast(true);
    setToastMessage("Gif eliminado correctamente!!!");
    // Actualizamos la lista de tarjetas llamando a fetchAllMemes()
    fetchAllMemes();
  };

  // actualiza toastPosition cada vez que el usuario desplaza la página.
  const handleScroll = () => {
    const position = window.pageYOffset + window.innerHeight / 2;
    setToastPosition({
      top: position,
      left: "50%",
      transform: "translateX(-50%)",
    });
  };

  // Este useEffect configura el evento de desplazamiento
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toastPosition.left]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // actualizar
  const handleUpdateMeme = async (e, id, setFormVisible) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/post/${id}`, {
      titulo: updatedTitle,
    });
    // seteo el estado
    setMeme((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id == id
          ? {
              ...meme,
              titulo: updatedTitle || null,
            }
          : meme
      )
    );
    setUpdatedTitle("");
    setEditingMeme(null);
    setFormVisible(false);
    setShowToast(true);
    setToastMessage("Gif actualizado correctamente!!!");
  };

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Favoritos" />
      {/* alert*/}
      <div className="container-fluid mt-3">
        <ToastAlert
          style={{ top: 0, position: "fixed", left: toastPosition.left }}
          show={showToast}
          variant="success"
          onClose={() => setShowToast(false)}
          dismissible
        >
          <Alert.Heading>{toastMessage}</Alert.Heading>
        </ToastAlert>

        <GifCards>
          {invertedMemes.map((meme, index) => (
            <GifCard
              key={index}
              onMouseEnter={() => setHoveredIndex(index)} // Manejar evento onMouseEnter para indicar que el cursor está sobre la tarjeta
              onMouseLeave={() => setHoveredIndex(-1)} // Manejar evento onMouseLeave para indicar que el cursor ya no está sobre la tarjeta
              // isHovered={isHovered} // Paso el estado isHovered como prop a la componente GifCard
              // setIsHovered={setIsHovered} // Paso la función setIsHovered como prop a la componente GifCard
            >
              <GifImage src={`${img_URL}${meme.imagen}`} alt={meme.titulo} />
              <GifTitle>{meme.titulo}</GifTitle>

              <GifActions className="gif-actions">
                {/* {console.log(hoveredIndex)} */}
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
                {/* {console.log(meme,editingMeme,editingMeme && editingMeme.Id === meme.id )}  */}
                {hoveredIndex === index &&
                  editingMeme &&
                  editingMeme.id === meme.id && (
                    <Form
                      onSubmit={(e) =>
                        handleUpdateMeme(e, meme.id, setFormVisible)
                      }
                    >
                      <Form.Group className="m-2">
                        <Form.Control
                          type="text"
                          placeholder="titulo"
                          value={updatedTitle}
                          onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                      </Form.Group>

                      <button
                        variant="primary"
                        type="submit"
                        size="sm"
                        className="m-2"
                      >
                        <StyledButton>guardar</StyledButton>
                      </button>
                    </Form>
                  )}
              </GifActions>
            </GifCard>
          ))}
        </GifCards>
        <Footer />
      </div>
    </div>
  );
};

const ToastAlert = styled(Alert)`
  z-index: 1;
`;

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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 70px; /* Establece una altura fija para el título */
  color: var(--clr-grey-10);
  background-color: var(--clr-grey-4);
  border-radius: 0 0 5px 5px;
  transform: translateY(100%);
  transition: transform 0.2s ease-in-out;
`;

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
    font-weight: bold;
    color: var(--clr-purple-light);
    padding: 3px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: var(--clr-primary-5);
      color: white;
    }
  }
`;

const StyledButton = styled.button`
  background-color: var(--clr-primary-2);
  color: var(--clr-grey-10);
  border: none;
  font-size: 1.2rem;
  padding: .2rem .2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--clr-primary-1);
  }
`;


export default CardFavList;

{
  /* <Form.Group className="m-2">
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
                  </Form.Group> */
}

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
