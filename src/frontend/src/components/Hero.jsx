import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import margarita from "../assets/margarita.gif";
import gatuno from "../assets/gatunoIntelligent.gif";
import homer from "../assets/homer.gif";
import mrbean from "../assets/mrbean.gif";
import jclaude from "../assets/jclaude.gif";
import torrente from "../assets/torrente.gif";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Lo que necesites <br />
          Gifs, Stickers, Memes y emoticons!!
        </h1>
        <h5>
          Busca los Gifs que mas te gusten y añadelos a tu lista de favoritos
        </h5>
        <Link to="/buscar" className="btn hero-btn">
          buscar Gifs
        </Link>
      </article>
      <article className="img-container">
        <img src={jclaude} alt={margarita} className="main-img" />
        <img src={torrente} alt="apple gadget" className="accent-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 50vh;
  display: grid;
  place-items: center;

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media screen and (max-width: 623px) {
    h1 {
      font-size: 2.2rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .main-img {
      width: 75%;
      height: 200px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      top: 370px;
      left: 365px;
      width: 150px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
  }

  @media (min-width: 624px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
      text-align: center;
      text-shadow: 0 1;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 400px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      top: 70px;
      left: 0;
      width: 200px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
  }
`;

export default Hero;
