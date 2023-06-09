import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { links } from "../utils/constants";
import { FaBars } from "react-icons/fa";
import Logo from "./logo";


import { useSidebarContext } from "../context/sidebar_context";
import { useAuthContext } from "../context/AuthContext";


const NavBar = () => {
  const { login, handlerLogout } = useAuthContext();

  const { openSidebar } = useSidebarContext();

  const navigate = useNavigate();

  const onLogout = () => {
    // llama a la función pasada en el context
    handlerLogout("false");

    navigate("/", {
      replace: false,
    });
  };

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <Logo />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>

        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            // Si el link es de inicio de sesión y el usuario está autenticado, no lo mostramos
            if (text === "login" && login.user ) {
              return null;
            }
            // Ocultar el enlace de registro si el usuario está autenticado
            if (text === "register" && login.user) {
              return null;
            }
            // Si el enlace es "users" y el usuario no es Admin, no lo mostramos
            if (text === "users" && !login.isAdmin ) {
              return null;
            }
            return (
              <li key={id}>
                <Link to={url}> {text} </Link>
              </li>
            );
          })}
        </ul>
        {login.user && (
          <span className="nav-item nav-link">{login.user?.username}</span>
        )}

        {login.user && <button onClick={onLogout}>Logout</button>}
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: fixed;
  z-index: 1;
  width: 100%;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }

  @media (min-width: 850px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1.5rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
  }
`;

export default NavBar;
