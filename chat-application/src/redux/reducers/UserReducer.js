import { GET_ALL_USERS, GET_ALL_USERS_ERROR } from "../actions/action";

const UserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        users: action.payload,
      };
      case GET_ALL_USERS_ERROR:
          return{
              error:action.payload
          }
    default:
      return state;
  }
};
export default UserReducer