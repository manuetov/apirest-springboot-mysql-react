// hooks personalizado para users que le pasa los estados y métodos al userProvider/userContext

import { useReducer, useState } from "react";
import { user_reducer } from "../reducers/user_reducer";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(user_reducer, initialUsers);
  // guarda los datos del usuario para actulizarlos
  const [userSelected, setuserSelected] = useState(initialUserForm);
  // formulario visible/no visible
  const [visibleForm, setvisibleForm] = useState(false);

  const [errors, setErrors] = useState(initialErrors);

  const navigate = useNavigate();

  const { login, handlerLogout } = useAuthContext();

  // recibe todos los users desde la api del backend
  const getUsers = async () => {
    try {
      const result = await findAll();
      console.log(result);
      // actualiza el estado con los datos recibidos
      dispatch({
        type: "loadingUser",
        payload: result.data,
      });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  // añade o actualiza usuario desde userform
  const handlerAddUsers = async (user) => {
    console.log(user);
    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }

      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });

      Swal.fire(
        user.id === 0 ? "Usuario Creado!!" : "Usuario actualizado",
        user.id === 0
          ? "Usuario se ha creado correctamente!!"
          : "Usuario ha sido actualizado correctamente!!",
        "success"
      );
      handlerCloseForm();
      navigate("/users");
      //  Si ocurre un error, se manejan diferentes casos de error y
      //  se muestra un mensaje correspondiente.
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          setErrors({ ...errors, username: "El username ya existe" });
        }
        if (error.response.data?.message?.includes("UK_email")) {
          setErrors({ ...errors, username: "El username ya existe" });
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUsers = (id) => {
    console.log(id);

    if (!login.isAdmin) return;

    Swal.fire({
      title: "Está seguro?",
      text: "El usuario será eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // del service para borrar
        try {
          await remove(id);
          dispatch({
            type: "removeUser",
            payload: id,
          });
          Swal.fire(
            "Usuario Eliminado!",
            "El usuario ha sido eliminado con exito!",
            "success"
          );
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  // datos del usuario seleccionado para update
  const handlerUserSelectedForm = (user) => {
    //console.log(user);
    setvisibleForm(true);
    setuserSelected({ ...user });
  };

  // handlers visible/no form
  const handlerOpenForm = () => {
    setvisibleForm(true);
  };

  // cierra el formulario de nuevo/actualizar usuario
  const handlerCloseForm = () => {
    setvisibleForm(false);
    // limpia el formulario
    setuserSelected(initialUserForm);
    // limpia los mensajes de errors del formulario
    setErrors({});
  };

  return {
    // atributos o propiedades
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    // funciones
    handlerAddUsers,
    handlerRemoveUsers,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
