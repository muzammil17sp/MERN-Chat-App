import { toast } from "react-toastify";
import * as Api from "../../api/index"
import store from "../store"
import { GET_ALL_USERS, GET_ALL_USERS_ERROR } from "./action";

export const getAllTheUsers = () =>async(dispatch ) =>{
    try {
        const {data} =await Api.getAllUser()
        const reduxStore = store.getState()
        const loginUserId = reduxStore.AuthReducer.user._id
const removeLoginUser = data.filter((user)=>user._id!==loginUserId)
        dispatch({type:GET_ALL_USERS,payload:removeLoginUser})
    } catch (error) {
        const errors =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message;
    //   toast.error(errors);
      dispatch({type:GET_ALL_USERS_ERROR,payload:errors})
    }
}