import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { SidebarProvider } from '../context/sidebar_context';


ReactDOM.createRoot(document.getElementById('root')).render(
 <SidebarProvider>
   <App />
 </SidebarProvider>

)
