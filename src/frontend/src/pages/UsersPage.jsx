// ruta users. muestra listado y form para crear users

import { useEffect } from "react";
import { UsersList, UserForm, PageHero } from "../components";

import { useUserContext } from "../context/UserContext";

const UsersPage = () => {
  const {
    // atributos o propiedades
    users,   
    visibleForm,
    // funciones
    handlerOpenForm,
    handlerRemoveUsers,
    handlerUserSelectedForm,
    getUsers
    // hooks personalizado
  } = useUserContext();

  useEffect(() => {
    getUsers()
  },[])

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Añadir users" />
      <div className="container my-4">
        <div className="row">
          {!visibleForm || (
            <div className="col-md-4">
              <UserForm />
            </div>
          )}

          <div className="col">
            {visibleForm || (
              <button 
                className="btn btn-primary"
                onClick = {handlerOpenForm}
              >
                Nuevo usuario
              </button>
            )}
            {/* se cargan los usuarios en la tabla */}
            {users.length === 0 ? (
              <div className="alert alert-warning">
                {" "}
                No hay usuarios en el sistema!
              </div>
            ) : (
              <UsersList
                users={users}
                handlerRemoveUsers={handlerRemoveUsers}
                handlerUserSelectedForm={handlerUserSelectedForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
