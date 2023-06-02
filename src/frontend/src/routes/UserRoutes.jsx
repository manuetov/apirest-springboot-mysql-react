import { NavBar, Sidebar} from "../components";
import { Navigate, Route,  Routes } from "react-router-dom";


import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserContext";
import { UsersPage }from "../pages/UsersPage";

export const UserRoutes = () => {
  return (
    <>
      <UserProvider>

        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/edit/:id" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </UserProvider>
    </>
  );
};
