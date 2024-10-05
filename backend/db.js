import mongoose from "mongoose";
import { union } from "zod";

mongoose.connect(
  "mongodb+srv://admin:8299497845proAV@cluster0.oeqz2xn.mongodb.net/paytmDB"
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
  },
  firstName: {
    type: String,
    maxlength: 20,
    required: true,
    trim: true,
  },
  lastName: { type: String, maxlength: 20, trim: true },
});

export const User = mongoose.model("USER", UserSchema);

const AccountsSchema = new mongoose.Schema({
  user_Id: {
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Accounts", AccountsSchema);
