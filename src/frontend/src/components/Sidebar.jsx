import styled from "styled-components";

import { links } from "../utils/constants";
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"; //X

import { useSidebarContext } from '../context/sidebar_context'

const Sidebar = () => {
   const { isSidebarOpen, closeSidebar } = useSidebarContext()

  return (
    <SidebarContainer>
      <aside 
         className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
         <div className="sidebar-header">
            <button className="close-btn" type="button" onClick={closeSidebar}>
               <FaTimes />
            </button>
         </div>

         <ul className="links">
            {links.map(({id, text, url}) => (
               <li key={id}>
                  <Link to={url} onClick={closeSidebar}>
                     {text}
                  </Link>
               </li>
            ))}
         </ul>
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }

  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 2rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-primary-1);
    color: var(--clr-grey-10);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(122, 131, 165, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

  @media screen and (min-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar