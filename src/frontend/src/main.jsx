import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import './main.css'


import { SidebarProvider } from './context/sidebar_context';


ReactDOM.createRoot(document.getElementById('root')).render(
 <SidebarProvider>
   <App />
 </SidebarProvider>

)
