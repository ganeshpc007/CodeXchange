import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: { type: Array, required: true },
    teamName: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("CodifyChat", chatSchema);

export default chatModel;
