import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chats", chatSchema);

export default chatModel;
