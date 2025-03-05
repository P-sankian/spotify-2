import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
      senderID : {type: String, required: true},
      receiverID : {type: String, required: true},
      content: {type: String, required: true},
}, { timestamps: true})

export const Messages = mongoose.model("Messages",messagesSchema);
