import { UsersList, UserForm, PageHero } from "../components";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const {
    // atributos o propiedades
    users,
    userSelected,
    initialUserForm,
    // funciones
    handlerAddUsers,
    handlerRemoveUsers,
    handlerUserSelectedForm,

    // hooks personalizado
  } = useUsers();

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Añadir users" />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4">
            {users === 0 ? (
              <div className="alert alert-warning">
                no hay usuarios resgistrados
              </div>
            ) : (
              <UserForm
                initialUserForm={initialUserForm}
                handlerAddUsers={handlerAddUsers}
                selectedUser={userSelected}
              />
            )}
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
