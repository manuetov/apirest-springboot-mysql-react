// formulario para añadir gif con persistencia en BD

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import styled from "styled-components";
import filaGifs from "../assets/fila-gifs.gif";
import PageHero from "./PageHero";

const FormAdd = ({novermiga}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // alerts toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // guarda la posición del toast en la pantalla
  const [toastPosition, setToastPosition] = useState({
    top: undefined,
  });

  // alert toast useEffect
  useEffect(() => {
    // actualiza toastPosition cada vez que el usuario desplaza la página.
    const handleScroll = () => {
      const position = window.pageYOffset + window.innerHeight / 2;
      setToastPosition({
        top: position,
        left: "50%",
        transform: "translateX(-50%)",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toastPosition.left]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
        headers: { 
          "Authorization": sessionStorage.getItem('token'),
          "Content-Type": "multipart/form-data"
         },
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

    setShowToast(true);
    setToastMessage("Gif añadido correctamente a fovoritos!!!");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="d-flex flex-wrap">
      <Wrapper>
       {novermiga || <PageHero title="Añadir gif"/>}
      <StyledArticle className="content">
        <h2>quieres guardar tus propios gifs? súbelos!!</h2>
        <p>
          Los GIFs son una secuencia de imágenes animadas que se repiten en
          bucle. Además, los GIFs se pueden crear a partir de clips de video, lo
          que significa que pueden utilizarse para resaltar momentos destacados
          o para hacer referencia a escenas famosas de películas o programas de
          televisión.
        </p>
      </StyledArticle>
      
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

        <FormContainer>
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
              <Form.Control type="file" onChange={handleFileInputChange} />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Imagen seleccionada"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="m-2">
              añadir a favoritos
            </Button>
          </Form>
        </FormContainer>
      </div>
      <img src={filaGifs} alt="gifs" />
      </Wrapper>
      </div>
    
  );
};

const StyledArticle = styled.article`
  padding: 2rem 4rem 0 4rem;
`;
const FormContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 5px;
`;

const ToastAlert = styled(Alert)`
  z-index: 1;
`;

const Wrapper = styled.section`
  min-height: 60vh;

  grid-gap: 4rem;

  display: grid;
  background: var(--clr-grey-10);
  img {
    width: 100%;
    padding: 2rem;
  }
`;

export default FormAdd;

/* <Form.Group className="m-2">
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
          </Form.Group> */
