import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";



const UserForm = ({ handlerAddUsers, initialUserForm, selectedUser, handlerCloseForm }) => {

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
    // en editar no se incluye el campo password 
    if (!username || !email || ( !password && id === 0 )) {
      Swal.fire({
        icon: 'error de validación',
        title: 'Oops...',
        text: 'ha dejado un campo vacío en el formulario!',
        footer: '<a href="">Debe rellenar todos los campos</a>'
      })
      return;
    }
    console.log(userForm);

    handlerAddUsers(userForm);
    setUserForm(initialUserForm);
  };

  // cuando se hace click en update
  useEffect(()=> {
      setUserForm({
         ...selectedUser,
         password: ''
      })
  }, [selectedUser])

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
      {/* si el id mayor que 0 */}
      { id > 0 ? '' : <input
        className="form-control my-3 w-75"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
      /> }
      
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input
         name="id"
         value={id}
         type="hidden"
      />
      <button
        className="btn btn-primary"
        type="submit"

      >
        { id > 0 ? 'Actualizar' : 'Crear'}
      </button>
      <button 
        className="btn btn-primary mx-5"
        type="button"
        onClick={handlerCloseForm}
      >
        Cerrar
      </button>
    </form>
  );
};

export default UserForm;
