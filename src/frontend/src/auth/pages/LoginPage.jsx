import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";
import styled from "styled-components";

const initialLoginForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { handlerLogin } = useAuthContext();

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const [showModal, setShowModal] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire(
        "Error de validacion",
        "Username y password requeridos",
        "error"
      );
    }

    // se lo paso al contexto para que autenticar al usuario en useAuth
    setIsLoading(true);
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <Container>
        <SpinnerContainer>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </SpinnerContainer>
      </Container>
    );
  }

  return (
    <>
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Login Page</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={onSubmit}>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
