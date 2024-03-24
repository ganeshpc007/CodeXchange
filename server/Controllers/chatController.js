import chatModel from "../Models/chatModel.js";

const createChat = async (req, res) => {
  try {
    const { members, teamName } = req.body;

    if (members.length === 2) {
      const chat = await chatModel.findOne({
        members: { $all: [members[0], members[1]] },
      });
      if (chat) return res.status(200).json(chat);
    }

    const newChat = new chatModel({ members: members, teamName });
    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userChats = await chatModel.find({ members: { $in: [userId] } });
    res.status(200).json(userChats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createChat, findUserChats };
