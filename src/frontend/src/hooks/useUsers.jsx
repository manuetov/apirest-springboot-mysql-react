// hooks personalizado para users

import { useEffect, useReducer, useState } from "react";
import { user_reducer } from "../reducers/user_reducer";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/userService";


const initialUsers = [
  // {
  //   id: 1,
  //   username: "Pepin",
  //   email: "pepin@gmail.com",
  //   password: "12345",
  // },
  // {
  //   id: 2,
  //   username: "Manolin",
  //   email: "manolin@gmail.com",
  //   password: "12345",
  // },
];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(user_reducer, initialUsers);
  // guarda los datos del usuario para actulizarlos
  const [userSelected, setuserSelected] = useState(initialUserForm);
  // formulario visible/no visible
  const [visibleForm, setvisibleForm] = useState(false)

  // recibe todos los users desde la api del backend
  const getUsers = async() => {
    const result = await findAll()
    console.log(result)
    // actualiza el estado con los datos recibidos
    dispatch({
      type:'loadingUser',
      payload: result.data
    })
  }

  // añade o actualiza usuario desde userform en el backend
  const handlerAddUsers = async (user) => {
   //  let type;
   //  if (user.id === 0) {
   //    type = "addUser";
   //  } else {
   //    type = "updateUser";
   //  }

   let response
    if (user.id === 0) {
      response = await save(user)
    } else {
      response = await update(user)
    }

    dispatch({
      type: (user.id === 0) ? "addUser" : "updateUser",
      payload: response.data,
    });

    Swal.fire(
      user.id === 0 ? "Usuario Creado!!" : "Usuario actualizado",
      user.id === 0
        ? "Usuario se ha creado correctamente!!"
        : "Usuario ha sido actualizado correctamente!!",
      "success"
    );
    handlerCloseForm()
  };

  const handlerRemoveUsers = (id) => {
    console.log(id);

    Swal.fire({
      title: "Está seguro?",
      text: "El usuario será eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // del service para borrar
        remove(id)
        dispatch({
          type: "removeUser",
          payload: id,
        });
        Swal.fire("Uusario Eliminado!", "El usuario ha sido borrado correctamente.", "success");
      }
    });
  };

  // datos del usuario seleccionado para update
  const handlerUserSelectedForm = (user) => {
    console.log(user);
    setvisibleForm(true)
    setuserSelected({ ...user });
  };

  // handlers visible/no form
  const handlerOpenForm = () => {
   setvisibleForm(true)
  }

  const handlerCloseForm = () => {
   setvisibleForm(false)
   // limpia el formulario
   setuserSelected(initialUserForm)
  }

  return {
    // atributos o propiedades
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    // funciones
    handlerAddUsers,
    handlerRemoveUsers,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers
  };
};
