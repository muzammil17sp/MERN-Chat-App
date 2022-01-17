import { USER_SIGNUP, AUTH_ERROR, USER_SIGNIN, USER_LOGOUT, PROFILE_UPDATE } from "../actions/action"

const AuthReducer = (state = { user: null, error: null }, action) => {
    switch (action.type) {
        case USER_SIGNUP:
            return {
                user: action.payload
            }
            case USER_SIGNIN:
                return {
                    user: action.payload
            }
            case PROFILE_UPDATE:
                return{
                    user : action.payload
                }
        case USER_LOGOUT:
            return {
                user:null
            }
        case AUTH_ERROR:
            return {
                error: action.payload
            }

        default:
            return state
    }
}
export default AuthReducer