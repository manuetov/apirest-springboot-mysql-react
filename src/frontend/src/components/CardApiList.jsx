import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import AddFav from "./AddFav";
import { Form, Button } from "react-bootstrap";

const APIKEY = import.meta.env.VITE_APP_API_KEY;

const CardApiList = () => {
  const [gifs, setGifs] = useState([]);
  const inputRef = useRef("");

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
  }, []);

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

  const handleFavorite = (gif) => {
    console.log(gif);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="m-2">
        <Form.Group className="m-2">
          <Form.Control
            type="text"
            placeholder="buscar"
            ref={inputRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-2">
          enviar
        </Button>
      </Form>

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