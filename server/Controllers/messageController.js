import messageModel from "../Models/messageModel.js";

const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text, code, isCode, lang } = req.body;

    const message = new messageModel({ chatId, senderId, text, code, isCode, lang });

    const response = await message.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const messages = await messageModel.find({ chatId });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createMessage, getMessages };
