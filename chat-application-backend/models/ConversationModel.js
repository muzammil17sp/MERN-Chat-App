import mongoosoe from "mongoose"
const conversationSchema = new mongoosoe.Schema({
    members:{
        type:Array
    },
    lastMessage:String,
    lastMessageTime : String
},{timestamps:true})
export default mongoosoe.model("Conversations", conversationSchema)