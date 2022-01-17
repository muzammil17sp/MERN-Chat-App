import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    publicId: String,
    status: { type: String, default: "Avaliable" }
}, {
    timestamps: true
})
export default mongoose.model("Auth", authSchema)