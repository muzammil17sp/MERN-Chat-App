import axios from "axios"
const api = axios.create({
    baseURL: "https://mern-chat-web-app.herokuapp.com/"

})
api.interceptors.request.use((request)=>{
    const userExist =JSON.parse(localStorage.getItem("user"))
    request.headers.authorization = userExist? `bearer ${userExist.token}` : ""
    return request
})

export const signup = (user) => api.post("/signup", user)
export const signin =  (user) =>api.post("/signin",user)
export const update = (updatedData) =>api.patch(`/update/${updatedData._id}`,updatedData)
export const getAllUser = ()=>api.get("/allUsers")
export const createConversation = (conversation) => api.post("/createConversation", conversation)

export const getConversation = (conversation) => api.post("/getConversation", conversation)
export const allConversation = () =>api.get("/allConversations")
