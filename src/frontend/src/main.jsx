import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap'

import { SidebarProvider } from '../context/sidebar_context';


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  // <Container>
 <SidebarProvider>

   <App />
 </SidebarProvider>
    // </Container> 
  //</React.StrictMode> 
)
