export const user_reducer = (state = [], action) => {
   
   switch (action.type) {
      case 'addUser':
         return [
            ...state,
            {
               ...action.payload,
               id: new Date().getTime()
            }
         ]
      default:
         return state
   }

}