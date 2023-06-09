import { Navigate, Route,  Routes } from "react-router-dom";


import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserContext";
import { UsersPage }from "../pages/UsersPage";

export const UserRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit/:id" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige a la ruta padre */}
      </Routes>
    </UserProvider>
  );
};