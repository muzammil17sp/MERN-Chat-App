import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
const UserCheck = async (request, response, next) => {
  try {
    let token;
    if (request.headers.authorization) {
      token = request.headers.authorization.split(" ")[1];
    }
    if (!token) {
      next(new ErrorResponse("Not Authorized to access", 400));
    }
    const user = jwt.verify(token, process.env.SECRET);
    const userFind = await User.findById(user._id);
    if (!userFind) {
      return next(new ErrorResponse("User not find", 404));
    }

    request.user = userFind;
    next();
  } catch (error) {
    next(new ErrorResponse("Not authrized to access this route", 400));
  }
};
export default UserCheck;
