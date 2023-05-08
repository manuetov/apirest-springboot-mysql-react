import React, { useReducer } from "react";
import PageHero from "./PageHero";


const UsersList = ({ users = [] }) => {
   console.log(users)

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
            {users.map(user => (
               <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                     <button 
                        type="button" 
                        className="btn btn-secundary btn-sm"
                     >
                        update
                     </button>
                  </td>
                  <td>
                     <button 
                        type="button" 
                        className="btn btn-danger btn-sm"
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
