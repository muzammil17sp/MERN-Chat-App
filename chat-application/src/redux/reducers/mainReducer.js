import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer"
import conversationReducer from "./ConversationReducer"
import messageReducer from "./MessageReducer"
const AllReducer = combineReducers({
    AuthReducer,
    UserReducer,
    conversationReducer,
    messageReducer
})
export default AllReducer