import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
    code: { type: Object, required: false },
    isCode: { type: Boolean, default: true },
    lang: String,
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("x_code_message", messageSchema);

export default messageModel;
