import React, { useReducer, useState } from "react";
import { UsersList, UserForm, PageHero } from "../components";
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
   id:0,
   username: "",
   password: "",
   email: "",
 }

const UsersPage = () => {
  const [users, dispatch] = useReducer(user_reducer, initialUsers);
  // guarda los datos del usuario para actulizarlos
  const [selectedUser, setSelectedUser] = useState(initialUserForm)

  // añade/actualiza usuario desde userform
  const handlerAddUsers = (user) => {
   let type;
   if(user.id === 0){
      type = 'addUser'
   } else {
      type = 'updateUser'
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
   console.log(user)
   setSelectedUser({ ...user })
  }

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Añadir users" />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4">
            {users === 0 ? 
              <div className="alert alert-warning">
                no hay usuarios resgistrados
              </div>
             : 
              <UserForm 
                initialUserForm={initialUserForm}
                handlerAddUsers={handlerAddUsers} 
                selectedUser={selectedUser}
              />
            }
          </div>
          <div className="col-md-8 ">
            <UsersList 
              users={users} 
              handlerRemoveUsers={handlerRemoveUsers} 
              handlerUserSelectedForm={handlerUserSelectedForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
