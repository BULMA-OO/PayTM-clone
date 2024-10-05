import { Router } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ user_Id: req.user_ID });
  res.status(200).send({
    balance: balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  const userA = await Account.findOne({ user_Id: req.user_ID }).session();
  if (userA.balance < amount) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({
      message: "Insufficient balance",
    });
  }
  const userB = await Account.findOne({user_Id: to}).session();
  if (!userB || req.user_ID === to) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({
      message: "Invalid account",
    });
  }
  await Account.findOneAndUpdate(
    { user_Id: req.user_ID },
    { $inc: { balance: -amount } }
  ).session();
  await Account.findOneAndUpdate(
    { user_Id: to },
    { $inc: { balance: +amount } }
  ).session();
  await session.commitTransaction();
  res.status(200).send({
    message: "Transfer successful",
  });
});
