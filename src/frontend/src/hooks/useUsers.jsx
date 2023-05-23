// hooks personalizado para users que le pasa los estados y métodos al userProvider/userContext

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
  const [visibleForm, setvisibleForm] = useState(false)
  const [errors, setErrors] = useState(initialErrors)


  // recibe todos los users desde la api del backend
  const getUsers = async () => {
    const result = await findAll()
    console.log(result)
    // actualiza el estado con los datos recibidos
    dispatch({
      type: 'loadingUser',
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
    try {
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
        user.id === 0
          ? "Usuario Creado!!"
          : "Usuario actualizado",
        user.id === 0
          ? "Usuario se ha creado correctamente!!"
          : "Usuario ha sido actualizado correctamente!!",
        'success'
      );
      handlerCloseForm()

    } catch (error) {
      if(error.response && error.response.status === 400) {
        console.log(error.response.data)
        setErrors(error.response.data)
      } else if (error.response && error.response.status === 500 && 
        error.response.data?.message?.includes('constraint')) { 

          if(error.response.data?.message?.includes('UK_username')) {
            setErrors({username: 'El username ya existe'})
          }
          if(error.response.data?.message?.includes('UK_email')) {
            setErrors({username: 'El username ya existe'})
          }
          
      } else {
        throw error;
      }
    }
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
    // limpia los mensajes de errors del formulario
    setErrors({})
  }

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
    getUsers
  };
};
