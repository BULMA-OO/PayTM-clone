import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../db.js";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware/middleware.js";
import { Account } from "../db.js";

export const userRouter = Router();

const signinSchema = z.object({
  username: z.string().email().min(3),
  password: z.string().min(6).max(20),
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20).optional(),
});

const updateSchema = z.object({
  password: z.string().min(6).max(20).optional(),
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
});

userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  const { success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    
    return res.status(411).send({
      message: "Incorrect inputs",
    });
  }
  const result = await User.findOne({ username: user.username });
  if (result) {
    return res.status(411).send({
      message: "Email already taken",
    });
  }
  const {_id} = await User.create(user);
  const token = jwt.sign({ user_ID: _id }, JWT_SECRET);
  res.status(200).send({
    message: "User created successfully",
    token: "Bearer " + token
  });
  const balance = Math.random() * 10000 + 1;
  await Account.create({ user_Id : _id, balance: balance});

});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const result = await User.findOne({
    username: username,
    password: password,
  });
  if (result) {
    const token = jwt.sign({ user_ID: result._id }, JWT_SECRET);
    return res.status(200).send({
      token: "Bearer " + token,
    });
  }
  res.status(411).send({
    message: "Error while logging in",
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(411).send({
      message: "Error while updating information",
    });
  }
  const user_ID = req.user_ID;
  await User.findByIdAndUpdate({ _id: user_ID }, body);
  res.status(200).send({
    message: "Updated successfully",
  });
});

userRouter.get("/myinfo", authMiddleware, async (req, res) => {
  const user = await User.findOne({_id: req.user_ID});
  res.status(200).send({name: user.firstName});
})

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const results = await User.find({
    $or: [{ firstName: filter }, { lastName: filter }],
  });
  const users = results.map((user) => {
    const obj = { _id: user._id, firstName: user.firstName, lastName: user.lastName || "" };
    return obj;
  });
  res.status(200).send({users: users});
});
