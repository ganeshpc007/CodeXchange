import Express from "express";
import {
  createMessage,
  getMessages,
} from "../Controllers/messageController.js";

const router = Express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);

export default router;
