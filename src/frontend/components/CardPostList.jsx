import Card from "react-bootstrap/Card";
import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import styled from 'styled-components'

const CardPostList = () => {
  const [recipes, setRecipes] = useState([]);
  const img_URL = "http://localhost:8080/api/post/image/get?imagen=";

  const fetchAllRecipes = async () => {
    const res = await axios.get("http://localhost:8080/api/post");
    console.log(res.data);
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div className="cardPostList d-flex flex-wrap ">


      {recipes.map((recipe, index) => (
      <Card key={index} className="card bg-dark m-2 mx-auto" style={{ width: "14rem"}}>
        <Card.Body className="text-center">
          <Card.Title className="fs-4 pb-2 fw-bold text-danger" >
            {recipe.titulo}
          </Card.Title>
          <Card.Img
            style={{ height: "12rem"}}
            src={`${img_URL}`+`${ recipe.imagen}`}
            alt={recipe.titulo}
            className='mb-2'
          />
          <Card.Subtitle className="pb-2 text-white">
            {recipe.descripcion}
          </Card.Subtitle>
          <Card.Text className="mb-5">
            {recipe.contenido}
          </Card.Text>         
        </Card.Body>
    </Card>
      ))}
        </div>
  );

};

export default CardPostList;
