export const user_reducer = (state = [], action) => {
  switch (action.type) {
    case "addUser":
      return [
        ...state,
        {
          ...action.payload,
          id: new Date().getTime(),
        },
      ];

    case "removeUser":
      return state.filter((user) => user.id !== action.payload);

    case "updateUser":
      return state.map((user) => {
        // si lo encuentra
        if (user.id === action.payload.id) {
          // spread para no mutar el payload
          return {
            ...action.payload,
            // en editar el password viene vacío
            password: user.password
          };
        }
        // sino lo encuentra
        return user;
      });

    case "loadingUser":
      return action.payload
      
    default:
      return state;
  }
};
