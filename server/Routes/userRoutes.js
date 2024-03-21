import Express from "express";
import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} from "../Controllers/userController.js";

const router = Express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

export default router;
