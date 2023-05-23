// formulario para añadir usuarios al listado

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../context/UserContext";



const UserForm = () => {

  const { userSelected, handlerAddUsers, initialUserForm, handlerCloseForm, errors } = useUserContext()

  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, email, password } = userForm;

  const onInputChange = ({ target }) => {
    console.log(target.value);

    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // validación formulario frontend
    // if (!username || (!password && id === 0) || !email) {
    //   Swal.fire(
    //     'Error de validacion',
    //     'Debe completar los campos del formulario!',
    //     'error'
    //   );

    //   return;
    // }
    // if (!email.includes('@')) {
    //   Swal.fire(
    //     'Error de validacion email',
    //     'El email debe ser valido, incluir un @!',
    //     'error'
    //   );
    //   return;
    // }
    // console.log(userForm);

    // guardar el user form en el listado de usuarios
    handlerAddUsers(userForm);
    setUserForm(initialUserForm);
  };


  // cuando se hace click en update
  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: ''
    })
  }, [userSelected])


  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  }

  return (
    <form onSubmit={onSubmit}>
      <h4>Crear nuevo usuario</h4>
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <p className="text-dager">{errors?.username}</p>
      {/* si el id mayor que 0 */}
      {id > 0 ? '' : <input
        className="form-control my-3 w-75"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
      />}
      <p className="text-dager">{errors?.password}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-dager">{errors?.email}</p>

      <input
        name="id"
        value={id}
        type="hidden"
      />
      <button
        className="btn btn-primary"
        type="submit"

      >
        {id > 0 ? 'Actualizar' : 'Crear'}
      </button>
      <button
        className="btn btn-primary mx-5"
        type="button"
        onClick={onCloseForm}
      >
        Cerrar
      </button>
    </form>
  );
};

export default UserForm;
