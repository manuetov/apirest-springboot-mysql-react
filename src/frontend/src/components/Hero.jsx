import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Lo que necesites <br />
          Gifs, Stickers, Memes y emoticons!!
        </h1>
        <p>
        Añade los memes que mas te guste a tu lista de favoritos
        </p>
        <Link to="/buscar" className="btn hero-btn">
          ver memes
        </Link>
      </article>
      <article className="img-container">
        {/* <img src={heroBcg} alt="apple gadget" className="main-img" /> */}
        {/* <img src={heroBcg2} alt="apple gadget" className="accent-img" /> */}
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media screen and (max-width:500px){
    h1 {
      font-size: 2.2rem;
    }
  }
  @media (min-width: 1024px) {
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
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      top: 70px;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--clr-primary-9);
      bottom: 0;
      border-radius: 50px;
    }
  }
`;

export default Hero;