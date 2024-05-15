import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function signup(request, response) {
  try {
    const { firstName, lastName, username, email, password, location, accupation } = request.body;
    const findUserByUsername = await User.findOne({ username });
    if (findUserByUsername)
      return response.send({
        name: "username",
        message: "Username is taken",
      });
    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail)
      return response.send({
        name: "email",
        message: "Email is taken",
      });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      location,
      accupation,
      views: Math.round(Math.random() * 100),
      impressions: Math.round(Math.random() * 100),
    });
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    savedUser.password = undefined;
    response.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function signin(request, response) {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username }).select("password");

    if (!user)
      return response.status(404).json({
        name: "username",
        message: "User not found",
      });

    const passwordsMatchs = await bcrypt.compare(password, user.password);

    if (!passwordsMatchs)
      return response.status(401).json({
        name: "password",
        message: "Password is not correct",
      });

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const options = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    };

    response.cookie("access_token", token, options);
    response.status(200).json(user);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function signout(request, response) {
  try {
    response.clearCookie("access_token");
    response.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}
