import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_Conversation } from "../redux/actions/ConversationActions";
const ChatConversation = ({ chatUser, setConversation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const selectConversation = () => {
    const conversation = {
      senderId: user._id,
      receiverId: chatUser._id,
    };
    dispatch(create_Conversation(conversation));
    setConversation(chatUser);
  };


  return (
    <div className="sidebar-single-conversation" onClick={selectConversation}>
      <div className="image-container">
        <img src={chatUser.profilePicture} alt="" />
      </div>

      <div className="sidebar-conversation-wrapper">
        <div className="name-container">
          <p>{chatUser.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
