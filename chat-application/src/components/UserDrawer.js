import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import "../components/styles/UserDrawer.css";
import { profileUpdate } from "../redux/actions/AuthAction";

export default function UserDrawer({ toggle, settoggle }) {
  const [usernameToggle, setusernameToggle] = useState(false);
  const [emailToggle, setemailToggle] = useState(false);
  const [statusToggle, setstatusToggle] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    status: "",
    profilePicture: "",
    username: "",
  });
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch()
  const imageChangeHander = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setUserData({ ...userData, profilePicture: reader.result });
    };
  };
const userProfileUpdateHandler = () =>{
  dispatch(profileUpdate(userData))
}
  useEffect(() => {
    setUserData(user);
    setusernameToggle(false)
    setemailToggle(false)
    setstatusToggle(false)
  }, [toggle]);

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation">
      <div className="userDrawer">
        <div className="profile-top">
          <p>Profile</p>
        </div>
        <div style={{ display: "flex" }}>
          <div className="drawer-imageContainer">
            <img src={userData?.profilePicture} alt="" />
          </div>
          <input
            type="file"
            id="image"
            onChange={imageChangeHander}
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <EditIcon
              style={{
                color: "green",
                cursor: "pointer",
                position: "absolute",
                right: 0,
                left: "73%",
                bottom: "67%",
              }}
            />
          </label>
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
              {!usernameToggle ? (
                <p>{user?.username}</p>
              ) : (
                <input
                  type="text"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  className="drawer-input"
                />
              )}
              <EditIcon
                onClick={() => setusernameToggle(!usernameToggle)}
                style={{ color: "green", cursor: "pointer" }}
              />
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
              {!emailToggle ? (
                <p>{user?.email}</p>
              ) : (
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="drawer-input"
                />
              )}
              <EditIcon
                onClick={() => setemailToggle(!emailToggle)}
                style={{ color: "green", cursor: "pointer" }}
              />
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
              {!statusToggle ? (
                <p>{user?.status}</p>
              ) : (
                <input
                  value={userData.status}
                  onChange={(e) =>
                    setUserData({ ...userData, status: e.target.value })
                  }
                  type="text"
                  className="drawer-input"
                />
              )}
              <EditIcon
                onClick={() => setstatusToggle(!statusToggle)}
                style={{ color: "green", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <button className="drawer-btn" onClick={userProfileUpdateHandler}>Update</button>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={"left"}
            open={toggle}
            onClose={() => settoggle(false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
