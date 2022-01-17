import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import db from "../Firebase";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { get_Conversation } from "../redux/actions/ConversationActions";
import { GET_MESSAGES_SUCCESS, GET_MESSAGE } from "../redux/actions/action";
import { CircularProgress } from "@mui/material";
import ConversationDrawer from "./ConversationDrawer";
import "./styles/Chats.css";
const Chats = ({ conversation }) => {
  const [toggle, settoggle] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const createdConversation = useSelector((state) => state.conversationReducer);
  const { messages, loading } = useSelector((state) => state.messageReducer);
  const sendMessage = () => {
    if (!message) return;
    const messageObj = {
      message,
      conversationId: createdConversation.conversation._id,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt : new Date(),
      senderId: user._id,
    };
    db.collection(createdConversation?.conversation?._id).add(messageObj);
    setMessage("");
  };

  useEffect(() => {
    const conversationDetail = {
      senderId: user?._id,
      receiverId: conversation?._id,
    };
    dispatch(get_Conversation(conversationDetail));
  }, [conversation]);
  useEffect(() => {
    if (createdConversation?.conversation?._id) {
      dispatch({ type: GET_MESSAGE });
      db.collection(createdConversation?.conversation?._id || 0)
        .orderBy("createdAt", "asc")
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });
        });
    }
  }, [createdConversation]);

  const scrollToBottom = () => {
    if (createdConversation?.conversation?._id) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chats">
      {conversation && (
        <>
          <div style={{ paddingTop: "20px ", background: "#262e35" }}>
            <div className="chats-top-name" onClick={() => settoggle(true)}>
              <img
                src={conversation.profilePicture}
                alt=""
                className="small-images"
              />
              <p>{conversation.username}</p>
            </div>
          </div>
          <hr style={{ background: "#36404a", padding: "2px" }} />

          <div className="chats-section">
            <div className="users-chats">
              {loading ? (
                <CircularProgress />
              ) : (
                messages?.map((message) => (
                  <>
                    <div
                      className={
                        "single-user-chats " +
                        (message.senderId === user._id && " send")
                      }
                    >
                      <div className="chat">
                        <div className="image-container">
                          <img
                            src={
                              message.senderId === user._id
                                ? user.profilePicture
                                : conversation.profilePicture
                            }
                            alt=""
                            className="small-images"
                          />
                        </div>
                        <div className="combine-container">
                          <p>
                            {message.senderId === user._id
                              ? user.username
                              : conversation.username}
                          </p>
                          <div className="main-chat-container">
                            <p>{message.message}</p>
                            <p className="time-ago">
                              {moment(message.timestamp).startOf('hour').fromNow()      }
                              
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
            <div ref={scrollRef} />
            </div>

            <div className="users-input">
              <div className="input-controller">
                <InputEmoji
                  cleanOnEnter
                  className="emoji-picker"
                  value={message}
                  onChange={setMessage}
                />
                <span className="file-icon mx-1">
                  <label htmlFor="files">
                    <AttachFileIcon
                      style={{
                        color: "#7269ef",
                        transform: "rotatez(411deg)",
                        cursor: "pointer",
                        fontSize: "28px",
                      }}
                    />
                  </label>
                </span>
                <span onClick={sendMessage}>
                  <SendIcon
                    style={{
                      color: "#7269ef",
                      cursor: "pointer",
                      fontSize: "28px",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      <ConversationDrawer
        user={conversation}
        toggle={toggle}
        settoggle={settoggle}
      />
    </div>
  );
};

export default Chats;
