import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/AuthModel.js";
import cloudinary from "../utils/cloudinary.js";
export const userSignup = async (request, response, next) => {
  const { username, email, password, confirmPassword, profilePicture } =
    request.body;
  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return next(new ErrorResponse("email already exist", 401));
    }
    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passowrd must be same", 401));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const profile = await cloudinary.v2.uploader.upload(profilePicture);
    const user = new User({
      email,
      username,
      profilePicture: profile.secure_url,
      publicId: profile.public_id,
      password: hashedPassword,
    });
    const signupUser = await user.save();
    console.log("signup user", signupUser);
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    response.status(201).send({
      message: "User  Signup successfully",
      user: {
        token,
        email: signupUser.email,
        profilePicture: signupUser.profilePicture,
        username: signupUser.username,
        status: signupUser.status,
        _id : signupUser._id
      },
    });
  } catch (error) {
    next(error);
  }
};

export const userSignin = async (request, response, next) => {
  const { email, password } = request.body;
  try {
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return next(new ErrorResponse("Invalid Email", 401));
    }
    const passowrdMatched = await bcrypt.compare(password, emailExist.password);
    if (!passowrdMatched) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const token = jwt.sign({ _id: emailExist._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    response.status(201).send({
      message: "User  Signin successfully",
      user: {
        token,
        email: emailExist.email,
        profilePicture: emailExist.profilePicture,
        username: emailExist.username,
        status: emailExist.status,
        _id: emailExist._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (request, response, next) => {
  const { id } = request.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(new ErrorResponse("Something went Wrong",401))
//   }
  const user = request.body;
  try {
    const findUser = await User.findOne({_id:request.params.id});
    if (user.email !== findUser.email) {
      const checkEmail = await User.findOne({ email: user.email });
      if (checkEmail) {
        return next(new ErrorResponse("Email already exist", 401));
      }
    }
    
    const newPic = await cloudinary.v2.uploader.upload(user.profilePicture)
    const newProfile = {
        email : user.email,
        username: user.username,
        profilePicture: newPic.secure_url,
        publicId: newPic.public_id,
        status:user.status
      };
      const updatedUser = await User.findByIdAndUpdate(user._id,newProfile,{new:true})
      console.log(updatedUser)
    response.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
