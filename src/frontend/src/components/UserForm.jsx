import React, { useState } from "react";

const initialUserForm = {
   username: "",
   password: "",
   email: "",
 }

const UserForm = ({ handlerAddUsers }) => {

  const [userForm, setUserForm] = useState(initialUserForm);

  const { username, email, password } = userForm;

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
    if (!username || !email || !password) {
      alert("debe completar todos los campos del forumulario");
      return;
    }
    console.log(userForm);

    handlerAddUsers(userForm);
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Formulario add user</h2>
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <button
        className="btn btn-primary"
        type="submit"
        onChange={onInputChange}
      >
        Crear
      </button>
    </form>
  );
};

export default UserForm;
