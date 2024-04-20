import userModel from "../Models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json("User with given email address already exists..");
    }

    if (!name || !email || !password) {
      return res.status(400).json("All fields required..");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Email must be valid..");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("Password must be strong..");
    }

    const salt = await bcrypt.genSalt(10); //gen 10 random char
    password = await bcrypt.hash(password, salt);

    user = new userModel({ name, email, password });

    await user.save();

    res.status(200).json({ _id: user._id, name, email });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid email or password..");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json("Invalid email or password..");
    }

    res.status(200).json({ _id: user._id, name: user.name, email });
  } catch (error) {
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json("User not found");
    }

    res.status(200).json({ _id: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users) {
      return res.status(400).json("Users not found");
    }

    const modifiedUsers = users.map((u) => {
      return { _id: u._id, name: u.name };
    });

    res.status(200).json(modifiedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    res.status(200).json({ _id: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { registerUser, loginUser, findUser, getUsers, findByEmail };
