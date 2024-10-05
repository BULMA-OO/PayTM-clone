import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const [ ,token] = req.headers.authorization.split(" "); 
  try {
    const {user_ID} = jwt.verify(token, JWT_SECRET);
    req.user_ID = user_ID;
    next();
  }
  catch {
    return res.status(403).send({message: "invalid token"});
  }
}