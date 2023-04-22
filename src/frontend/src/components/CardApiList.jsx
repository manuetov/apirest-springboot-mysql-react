import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import AddFav from "./AddFav";
import { Form, Button, Toast, Alert } from "react-bootstrap";

const APIKEY = import.meta.env.VITE_APP_API_KEY;

const CardApiList = () => {
  const [gifs, setGifs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const inputRef = useRef("");

  const [showToast, setShowToast] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  // guarda la posición del toast en la pantalla
  const [toastPosition, setToastPosition] = useState({
    top: undefined,
    left: "40%",
    transform: "translate(-50%, -50%",
  });

  const getGifs = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: APIKEY,
          limit: 25,
          rating: "g",
        },
      })
      .then((response) => setGifs(response.data.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getGifs();

    // actualiza toastPosition cada vez que el usuario desplaza la página.
    const handleScroll = () => {
      const position = window.pageYOffset + window.innerHeight /2;
      setToastPosition({ top: position, left: toastPosition.left });
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // buscar en la api
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    axios
      .get("https://api.giphy.com/v1/gifs/search?", {
        params: {
          api_key: APIKEY,
          q: inputValue,
          limit: 25,
        },
      })
      .then((response) => setGifs(response.data.data))
      .catch((error) => console.error(error));
  };

  // añadir a favoritos
  const handleFavorite = async (gif) => {
    const { data } = await axios.get(gif.images.fixed_height.url, {
      responseType: "blob",
    });

    const formData = new FormData();
    formData.append("titulo", gif.title);
    formData.append("descripcion", "");
    formData.append("contenido", "");
    formData.append("imagen", data, "image.gif");

    // Envio formData al servidor
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
      })
      .catch((error) => console.error(error));

    setShowToast(true);
    setToastMessage("Gif añadido a fovoritos!!!");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="m-2">
        <Form.Group className="m-2">
          <Form.Control
            type="text"
            placeholder="Introduce un texto "
            ref={inputRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="sm" className="m-2">
          buscar
        </Button>
      </Form>

      {/* alert*/}
      <div className="container-fluid mt-3">

          <ToastAlert
            style={{ top: 0, position:"fixed", left: toastPosition.left }}
            show={showToast}
            variant="success"
            onClose={() => setShowToast(false)}
            dismissible
          >
            <Alert.Heading>{toastMessage}</Alert.Heading>
          </ToastAlert>

          <h1>Trending Gifs</h1>
          <GifCards>
            {gifs.map((gif) => (
              <GifCard key={gif.id}>
                <GifImage src={gif.images.fixed_height.url} alt={gif.title} />
                <GifTitle className="gif-title">{gif.title}</GifTitle>
                <GifActions className="gif-actions">
                  <button onClick={() => handleFavorite(gif)}>
                    <AddFav />
                  </button>
                </GifActions>
              </GifCard>
            ))}
          </GifCards>
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
  bottom: 21%;
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

export default CardApiList;

// const formData = new FormData()
// formData.append("titulo", gif.title)
// // formData.append("imagen", gif.images.fixed_height.url)
// console.log(formData)

// axios.post("http://localhost:8080/api/post", formData, {
//   headers: { "Content-Type": "multipart/form-data" },
// })

{
  /* toast
      <Toast
        style={{ top: toastPosition.top, left: toastPosition.left }}
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast> */
}
