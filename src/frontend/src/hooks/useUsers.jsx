import { useReducer, useState } from "react";
import { user_reducer } from "../reducers/user_reducer";

const initialUsers = [
  {
    id: 1,
    username: "Pepin",
    email: "pepin@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    username: "Manolin",
    email: "manolin@gmail.com",
    password: "12345",
  },
];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = (user) => {
  const [users, dispatch] = useReducer(user_reducer, initialUsers);
  // guarda los datos del usuario para actulizarlos
  const [userSelected, setuserSelected] = useState(initialUserForm);

  // añade/actualiza usuario desde userform
  const handlerAddUsers = (user) => {
    let type;
    if (user.id === 0) {
      type = "addUser";
    } else {
      type = "updateUser";
    }
    dispatch({
      type: type,
      payload: user,
    });
  };

  const handlerRemoveUsers = (id) => {
    console.log(id);
    dispatch({
      type: "removeUser",
      payload: id,
    });
  };

  // datos del usuario seleccionado para update
  const handlerUserSelectedForm = (user) => {
    console.log(user);
    setuserSelected({ ...user });
  };

  return {
    // atributos o propiedades
    users,
    userSelected,
    initialUserForm,
    // funciones
    handlerAddUsers,
    handlerRemoveUsers,
    handlerUserSelectedForm,
  };
};
