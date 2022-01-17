import conversationSchema from "../models/ConversationModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
export const createConversation = async (request, response, next) => {
  const { senderId, receiverId } = request.body;
  try {
    const conversationExist = await conversationSchema.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (conversationExist) {
      return next(new ErrorResponse("Conversation already Exist", 401));
    }
    const conversation = conversationSchema({
      members: [senderId, receiverId],
    });

    const createdConversation = await conversation.save();
    response.status(201).send(createdConversation);
  } catch (error) {
    next(error);
  }
};
export const getConversation = async (request, response, next) => {
  const { senderId, receiverId } = request.body;
  try {
    const conversation = await conversationSchema.findOne({
      members: { $all: [senderId, receiverId] },
    });
    response.status(201).send(conversation);
  } catch (error) {
    next(error);
  }
};

export const getAllConversations = async (request, response, next) => {
  try {
    const conversations = await conversationSchema.find({})
    response.status(200).send(conversations);
  } catch (error) {
    next(error);

  }
}