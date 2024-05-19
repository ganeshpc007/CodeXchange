import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
    code: { type: String, required: false },
    isCode: { type: Boolean, default: true },
    lang: {
      label: String,
      icon: String,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("x_code_message", messageSchema);

export default messageModel;
