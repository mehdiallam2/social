import Post from "../models/post.model.mjs";
import User from "../models/user.model.mjs";
import Comment from "../models/comment.model.mjs";

export async function getPosts(request, response) {
  try {
    const posts = await Post.find()
      .populate("userId")
      .populate({
        path: "comments",
        populate: { path: "userId" },
      })
      .sort({ createdAt: -1 });
    response.send(posts);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

export async function getPost(request, response) {
  try {
    const { id } = request.params;
    const post = await Post.findById(id).populate("userId comments");
    if (!post) return response.status(404).json({ message: "Post Not Found" });
    post.author.password = undefined;
    response.send(post);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
}

export async function createPost(request, response) {
  try {
    const {
      user,
      body: { content, media },
    } = request;
    const newPost = new Post({
      userId: user._id,
      content,
      media,
    });
    user.posts.push(newPost._id);
    await newPost.save();
    await user.save();
    const posts = await Post.find();
    response.status(201).json(posts);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

export async function deletePost(request, response) {
  try {
    const {
      user,
      params: { id },
    } = request;
    const post = await Post.findById(id);
    if (!post) return response.status(404).json({ message: "Post Not Found" });
    if (user._id.toString() !== post.author._id.toString())
      return response.status(401).json({ message: "Unauthorized to delete this post" });
    await post.deleteOne();
    await User.findByIdAndUpdate(user._id, { $pull: { posts: id } });
    response.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

export async function likeUnlikePost(request, response) {
  try {
    const {
      user,
      params: { id },
    } = request;

    const post = await Post.findById(id);
    if (!post) return response.status(404).json({ message: "Post Not Found" });
    const isLiked = post.likes.includes(user._id);

    if (isLiked) {
      await post.updateOne({ $pull: { likes: user._id } });
      const updatedPost = await Post.findById(id);
      return response.status(200).json(updatedPost);
    } else {
      await post.updateOne({ $push: { likes: user._id } });
      const updatedPost = await Post.findById(id);
      return response.status(200).json(updatedPost);
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function commentOnPost(request, response) {
  try {
    const {
      user,
      params: { id },
      body: { content },
    } = request;

    const post = await Post.findById(id);
    if (!post) return response.status(404).json({ message: "Post Not Found" });
    const newComment = new Comment({
      userId: user._id,
      postId: post._id,
      content,
    });
    await post.updateOne({ $push: { comments: newComment } });
    await newComment.save();
    const comments = await Comment.find();
    response.status(201).json(comments);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
