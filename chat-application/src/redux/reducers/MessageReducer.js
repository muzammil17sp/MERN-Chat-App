import { GET_MESSAGE, GET_MESSAGES_SUCCESS, } from "../actions/action";

const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
  
    case GET_MESSAGE:
      return {
        loading: true,
        messages:[]
      };
      case GET_MESSAGES_SUCCESS:
        return{
          loading:false,
          messages:action.payload
        }
     
    default:
      return state;
  }
};
export default messageReducer;
