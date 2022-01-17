import React, { useEffect,useState } from "react";
import { getAllTheUsers } from "../redux/actions/UserAction";
import {get_All_Conversation} from "../redux/actions/ConversationActions"
import ChatConversation from "./ChatConversation";
import AccountMenu from "../components/SidebarSaperate";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Sidebar.css";
import { CircularProgress } from "@mui/material";
import TemporaryDrawer from "./UserDrawer";
const Sidebar = ({  setConversation }) => {
const [toggle, settoggle] = useState(false)
const [text, setText] = useState("")
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    dispatch(getAllTheUsers());
    dispatch(get_All_Conversation())
  }, []);
const filterUsers = users?.filter((user)=>user.username.toLowerCase().includes(text.toLowerCase()))


  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h1 className="heading">Chats</h1>
        <AccountMenu  toggle={toggle} settoggle={settoggle} />
      </div>
      <div className="sidebar-input-container">
        <label htmlFor="input">
          <SearchIcon style={{ fontSize: "28px", color: "#9aa1b9" }} />
        </label>
        <input value={text} onChange={(e)=>setText(e.target.value)} id="input" type="text" placeholder="Search users" />
      </div>
      <h1 className="heading smallHeading">Recent</h1>
      <div className="sidebar-conversations">
        {users ? (
          filterUsers.map((chatUser) => (
            <ChatConversation
              chatUser={chatUser}
              setConversation={setConversation}
              key={chatUser._id}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      <TemporaryDrawer toggle={toggle} settoggle={settoggle}/>
      </div>
    </div>
  );
};

export default Sidebar;
