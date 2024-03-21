import Express from "express";
import {
  createChat,
  findUserChats,
  //   findChat,
} from "../Controllers/chatController.js";

const router = Express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
// router.get("/find/:firstId/secondId:", findChat);

export default router;
