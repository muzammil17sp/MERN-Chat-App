import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [conversation, setConversation] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
   
  }, []);

  return (
    <Row className="px-0">
      <Col md={3}>
        <Sidebar  setConversation={setConversation} />
      </Col>
      <Col md={9}>
        <Chats conversation={conversation} />
      </Col>
    </Row>
  );
};

export default Home;
