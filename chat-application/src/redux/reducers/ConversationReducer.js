import {
  CONVERSATION_ERROR,
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  CHANGE_CONVERSATION_LAST_MESSAGE,
  SEND_MESSAGE
} from "../actions/action";

const conversationReducer = (state = { conversation: {}, conversations: [] }, action) => {
  switch (action.type) {
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
  
    case GET_ALL_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload
      }
    case CONVERSATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default conversationReducer;
