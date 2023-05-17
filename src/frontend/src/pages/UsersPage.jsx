// ruta users. muestra listado y form para crear users

import { UsersList, UserForm, PageHero } from "../components";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const {
    // atributos o propiedades
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    // funciones
    handlerAddUsers,
    handlerRemoveUsers,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm

    // hooks personalizado
  } = useUsers();

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Añadir users" />
      <div className="container my-4">
        <div className="row">
          {!visibleForm || (
            <div className="col-md-4">
              <UserForm
                initialUserForm={initialUserForm}
                handlerAddUsers={handlerAddUsers}
                selectedUser={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
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
