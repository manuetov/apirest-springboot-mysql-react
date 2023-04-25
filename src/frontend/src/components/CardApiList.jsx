import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import AddFav from "./AddFav";
import { Form, Button, Alert } from "react-bootstrap";
import PageHero from "./PageHero";
import Footer from "./Footer";

const APIKEY = import.meta.env.VITE_APP_API_KEY;

const CardApiList = () => {
  const [gifs, setGifs] = useState([]);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const inputRef = useRef("");

  // alerts toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // guarda la posición del toast en la pantalla
  const [toastPosition, setToastPosition] = useState({
    top: undefined,
  });

  const getGifs = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: APIKEY,
          limit: 100,
          rating: "g",
        },
      })
      .then((response) => setGifs(response.data.data))
      .catch((error) => console.error(error));
  };

  // alert toast
  useEffect(() => {
    getGifs();

    // actualiza toastPosition cada vez que el usuario desplaza la página.
    const handleScroll = () => {
      const position = window.pageYOffset + window.innerHeight /2;
      setToastPosition({ top: position, left: '50%', transform: 'translateX(-50%)' });
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


  // buscar en la api
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    axios
      .get("https://api.giphy.com/v1/gifs/search?", {
        params: {
          api_key: APIKEY,
          q: inputValue,
          limit: 50,
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
    formData.append("imagen", data, "image.gif");

    // Envio formData al servidor
    axios
      .post("http://localhost:8080/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //console.log(res.data);
        setTitle("");
        setFile(null);

        // Verifica si el gif ya existe en el estado antes de agregarlo
        const gifExists = gifs.some(existingGif => existingGif.id === gif.id)
        if(!gifExists) {
          setGifs(prevGifs => [gif, ...prevGifs])
        }
      })
      .catch((error) => console.error(error));

    setShowToast(true);
    setToastMessage("Gif añadido a fovoritos!!!");
  };

  return (
    <div className="d-flex flex-wrap">
      <PageHero title='Buscar gifs'/>
      <MyForm onSubmit={handleSubmit}>
      <MyInput
        type="text"
        placeholder="Introduce un texto"
        ref={inputRef}
      />
      <MyButton type="submit">buscar</MyButton>
    </MyForm>
      

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
          <Footer />
        </div>
    </div>
  );
};

const ToastAlert = styled(Alert)`
  z-index: 1;
`;

const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  padding: 15px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-top:1rem;
`;

const MyInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const MyButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden; 
  height: 70px;
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
