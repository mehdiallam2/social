import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    media: {
      type: String,
    },
    visibility: {
      type: String,
      default: "public",
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    shares: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    hashtags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
