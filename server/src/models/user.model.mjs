import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 7,
    },
    avatarURL: {
      type: String,
      default: "http://localhost:3000/default.jpg",
    },
    location: {
      type: String,
    },
    accupation: {
      type: String,
    },
    views: {
      type: Number,
    },
    impressions: {
      type: Number,
    },
    bio: {
      type: String,
    },
    website: { type: String },
    dateOfBirth: { type: Date },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
