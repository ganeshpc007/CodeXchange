import Express from "express";
import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  findByEmail,
} from "../Controllers/userController.js";

const router = Express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.get("/findbyemail/:email", findByEmail);

export default router;
