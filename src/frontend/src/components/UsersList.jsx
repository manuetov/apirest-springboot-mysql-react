// listado de usuarios registrados
import { useUserContext } from "../context/UserContext";
import React, { useReducer } from "react";

const UsersList = () => {

const { users = [], handlerRemoveUsers, handlerUserSelectedForm } = useUserContext()

  console.log(users);

  return (
    <div className="d-flex flex-wrap">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            <th>update</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-secundary btn-sm"
                  onClick={() => handlerUserSelectedForm(user)}
                >
                  update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handlerRemoveUsers(user.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
