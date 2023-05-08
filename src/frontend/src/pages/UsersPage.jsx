import React, { useReducer } from "react";
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

const UsersPage = () => {

   const [ users, dispatch ] = useReducer(user_reducer, initialUsers)

   // añade usuario desde userform 
   const handlerAddUsers = (user) => {
      dispatch({
         type: 'addUser',
         payload: user 
      })
   }

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Añadir users" />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <UserForm handlerAddUsers={handlerAddUsers}/>
          </div>
          <div className="col-md-6">
            <UsersList users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
