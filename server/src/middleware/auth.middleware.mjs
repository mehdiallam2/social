import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";

export async function verifyJWT(request, response, next) {
  const token = request.cookies.access_token;
  if (!token) return response.status(401).json({ message: "Unauthorized" });
  const verification = jwt.verify(token, process.env.JWT_SECRET);
  if (!verification) return response.status(403).json({ message: "Invalid access token" });
  const user = await User.findById(verification.id);
  request.user = user;
  next();
}
