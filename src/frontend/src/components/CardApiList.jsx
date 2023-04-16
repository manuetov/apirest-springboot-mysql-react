import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const APIKEY = import.meta.env.VITE_APP_API_KEY;

const CardApiList = () => {
   const [gifs, setGifs] = useState([]);

   const getGifs = () => {
      axios.get('https://api.giphy.com/v1/gifs/trending', {
         params: {
           api_key: APIKEY,
           limit: 25,
           rating: 'g'
         }
       })
       .then(response => setGifs(response.data.data))
       .catch(error => console.error(error));
   }

   useEffect(() => {
      getGifs()
   }, []);
 
   return (
<div>
      <h1>Trending Gifs</h1>
      <GifCards>
        {gifs.map((gif) => (
          <GifCard key={gif.id}>
            <GifImage src={gif.images.fixed_height.url} alt={gif.title} />
            <GifTitle className="gif-title">{gif.title}</GifTitle>
            <GifActions className="gif-actions">
              <button onClick={() => handleFavorite(gif)}>Add to Favorites</button>
            </GifActions>
          </GifCard>
        ))}
      </GifCards>
    </div>
   )
};

const GifCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GifCard = styled.div`
  margin: 10px;
  width: 200px;
  height: 300px;
  position: relative;
  cursor: pointer;
  &:hover .gif-title {
    transform: translateY(0);
  }
  &:hover .gif-actions {
    transform: translateY(0);
  }
`;

const GifImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const GifTitle = styled.h3`
  position: absolute;
  bottom: 0;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  & > * {
    margin: 10px;
  }
  & > button {
    border: none;
    background-color: white;
    color: black;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;


export default CardApiList;


//const URL = `https://api.giphy.com/v1/gifs/search?api_key=cRtgVU7qbxYGTVEt1pqAfq6kiQh25oOF&q=${category}&limit=${20}`;
// https://api.giphy.com/v1/gifs/search?api_key=cRtgVU7qbxYGTVEt1pqAfq6kiQh25oOF&q=${perro}&limit=${25}&offset=0&rating=g&lang=en

// https://api.giphy.com/v1/gifs/trending?api_key=cRtgVU7qbxYGTVEt1pqAfq6kiQh25oOF&limit=25&rating=g
// https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&q=perro&limit=${25}