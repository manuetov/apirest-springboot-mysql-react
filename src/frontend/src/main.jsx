import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import "./main.css";

import { SidebarProvider } from "./context/sidebar_context";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
    </UserProvider>
  </AuthProvider>
);
