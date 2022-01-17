import * as API from "../../api/index";
import store from "../store"

import { toast } from "react-toastify";
import { AUTH_ERROR, PROFILE_UPDATE, PROFILE_UPDATE_ERROR, USER_LOGOUT, USER_SIGNIN, USER_SIGNUP } from "./action";
export const userSignup = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signup(userData);
    dispatch({ type: USER_SIGNUP, payload: data.user });
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
   
  } catch (error) {
    const errors =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    toast.error(errors);
    dispatch({ type: AUTH_ERROR, payload: errors });
  }
};
export const userSignin = (userInfo, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signin(userInfo);
    dispatch({ type: USER_SIGNIN, payload: data.user });
    // toast.success(data.message);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
    
  } catch (error) {
    const errors =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    toast.error(errors);
    dispatch({ type: AUTH_ERROR, payload: errors });
  }
};

export const logout = (navigate) => async (dispatch) => {
    
    dispatch({ type: USER_LOGOUT });
    navigate("/auth");
    localStorage.removeItem("user");
};
export const profileUpdate = (userData) => async (dispatch) => {
  const reduxStore = store.getState()
  try {
    const loginUserToken = reduxStore.AuthReducer.user.token

    const {data} = await API.update(userData)
    const replcalocalStorageData ={
     email: data.email,
     profilePicture : data.profilePicture,
     token : loginUserToken,
     status: data.status,
     username: data.username,
     _id : data._id

    }
    localStorage.setItem("user", JSON.stringify(replcalocalStorageData));
    dispatch({type : PROFILE_UPDATE,payload:replcalocalStorageData})
    toast.success("Profile updated successfully")
  } catch (error) {
    const errors =
    error.response && error.response.data.error
      ? error.response.data.error
      : error.message;
  toast.error(errors);
  dispatch({ type: PROFILE_UPDATE_ERROR, payload: errors });
  }
};
