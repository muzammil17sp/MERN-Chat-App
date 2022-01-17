import { toast } from "react-toastify";
import * as Api from "../../api/index"
import {CONVERSATION_ERROR, CREATE_CONVERSATION, GET_ALL_CONVERSATIONS, GET_CONVERSATION} from "./action"
export const create_Conversation = (conversationDetail) =>async(dispatch) =>{
    try {
        const {data} = await Api.createConversation(conversationDetail)
        dispatch({type : CREATE_CONVERSATION,payload:data})
    } catch (error) {
        const errors =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message;
    //   toast.error(errors);
      dispatch({type:CONVERSATION_ERROR,payload:errors})
    }
}
export const get_Conversation = (conversation) =>async(dispatch)=>{
    try {
    const {data} = await Api.getConversation(conversation)
    dispatch({type:GET_CONVERSATION,payload:data})
    } catch (error) {
        const errors =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message;
    //   toast.error(errors);
      dispatch({type:CONVERSATION_ERROR,payload:errors})
    }
}
export const get_All_Conversation = () => async (dispatch) => {
    try {
        const { data } = await Api.allConversation()
        dispatch({type : GET_ALL_CONVERSATIONS,payload:data})
    } catch (error) {
        const errors =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message;
      // toast.error(errors);
      dispatch({type:CONVERSATION_ERROR,payload:errors})
    }
}