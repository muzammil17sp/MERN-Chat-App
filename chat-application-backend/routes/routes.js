import express from "express";
import {
  getUsers,
  updateProfile,
  userSignin,
  userSignup,
} from "../controller/Authentication.js";
import {
  createConversation,
  getConversation,
  getAllConversations
} from "../controller/Conversation.js";
import UserCheck from "../middleware/UserCheck.js";
const router = express.Router();
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/allUsers", UserCheck, getUsers);
router.post("/createConversation", UserCheck, createConversation);
router.post("/getConversation", UserCheck, getConversation);
router.get("/allConversations",UserCheck,getAllConversations)
router.patch("/update/:id",updateProfile);

export default router;
