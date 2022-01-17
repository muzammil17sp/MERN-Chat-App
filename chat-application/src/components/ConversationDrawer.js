import React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Drawer from "@mui/material/Drawer";
import "../components/styles/UserDrawer.css";
import { ToastContainer } from "react-toastify";

export default function ConversationDrawer({ toggle, settoggle,user }) {



  const list = () => (
    <Box sx={{ width: 350 }} role="presentation">
      <div className="userDrawer">
        <div className="profile-top">
          <p> User Profile</p>
        </div>
        <div className="drawer-imageContainer">
          <img src={user?.profilePicture} alt="" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <span style={{ fontSize: "14px" }}>Username</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                
                margin: "10px 0",
              }}
            >
                <p>{user?.username}</p>
            </div>
          </div>
          <div className="profile-username">
            <span style={{ fontSize: "14px" }}>Email</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <p>{user?.email}</p>

            </div>
          </div>
          <div className="profile-username">
            <span style={{ fontSize: "14px" }}>Status</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <p>{user?.status}</p>
           
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={"right"}
            open={toggle}
            onClose={() => settoggle(false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer/>
    </div>
  );
}
