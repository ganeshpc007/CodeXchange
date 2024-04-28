import chatModel from "../Models/chatModel.js";
import { findUserFun } from "./userController.js";

const createChat = async (req, res) => {
  try {
    const { members, teamName } = req.body;

    if (members.length === 2) {
      const chat = await chatModel.findOne({
        $and: [
          { members: { $all: [members[0], members[1]] } },
          { members: { $size: 2 } },
        ],
      });
      if (chat) return res.status(200).json(chat);
    }

    const newChat = new chatModel({ members: members, teamName });
    const response = await newChat.save();

    const user = await findUserFun(members[1]);
    const { _id, name, email } = user;
    const chat = {
      _id: response._id,
      members: response.members,
      recipients: [{ _id, name, email }],
    };
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userChats = await chatModel.find({ members: { $in: [userId] } });

    const modifiedChats = await Promise.all(
      userChats?.map(async (c) => {
        const recipientIds = c.members.filter((id) => id !== userId);
        const recipients = await Promise.all(
          recipientIds.map(async (id) => {
            const user = await findUserFun(id);
            return { _id: user._id, name: user.name, email: user.email };
          })
        );
        const { _id, members, teamName } = { ...c._doc };
        if (recipientIds.length > 1) {
          return { _id, members, teamName, recipients };
        }
        return {
          _id,
          members,
          recipients,
        };
      })
    );

    // console.log("modifiedChats", modifiedChats);
    res.status(200).json(modifiedChats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createChat, findUserChats };
