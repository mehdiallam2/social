import User from "../models/user.model.mjs";

export async function findUsers(request, response) {
  try {
    const users = await User.find();
    response.send(users);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function findUser(request, response) {
  try {
    const {
      params: { id },
    } = request;
    const user = await User.findById(id);
    if (!user) return response.status(404).json({ message: "User not found" });
    response.send(user);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function getUserProfile(request, response) {
  try {
    const {
      params: { username },
    } = request;

    const user = await User.findOne({ username })
      .populate("posts following followers")
      .populate({
        path: "posts",
        populate: { path: "comments" },
      })
      .populate({
        path: "posts.comments",
        populate: { path: "userId" },
      });
    console.log(user);
    if (!user) return response.status(404).json({ message: "User not found" });
    user.password = undefined;
    response.json(user);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function updateUser(request, response) {
  try {
    const {
      params: { id },
      body: { firstName, lastName, username, bio },
      user,
    } = request;
    if (user._id.toString() !== id)
      return response.status(400).json({ message: "You can't update another profile" });
    const isThisUsernameTaken = await User.findOne({ username });
    if (isThisUsernameTaken && isThisUsernameTaken.username !== user.username)
      return response.status(400).json({ name: "username", message: "Username taken" });
    await User.findByIdAndUpdate(id, { firstName, lastName, username, bio });
    const updatedUser = await User.findById(id);
    response.send(updatedUser);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function uploadAvatar(request, response) {
  try {
    const { user, file } = request;
    console.log(user);
    console.log(file);
    await User.findByIdAndUpdate(user._id, {
      avatarURL: `http://localhost:3000/uploads/${file.filename}`,
    });
    response.json({ message: "Image changed seccecfuly" });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function deleteUser(request, response) {
  try {
    const { user } = request;
    await User.findByIdAndDelete(user._id);
    response.status(200).json({ message: "User Deleted" });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function getUserFollowing(request, response) {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    const following = (await user.populate("following")).following;
    response.send(following);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function getUserFollowers(request, response) {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    const followers = (await user.populate("followers")).followers;
    response.send(followers);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

export async function followOrUnfollow(request, response) {
  try {
    const { id } = request.params;
    const { user } = request;

    const currentUser = await User.findById(user._id);
    const othertUser = await User.findById(id);

    if (id === user._id.toString())
      return response.status(400).send({ message: "You can't follow your self" });

    if (currentUser.following.includes(id)) {
      await currentUser.updateOne({ $pull: { following: id } });
      await othertUser.updateOne({ $pull: { followers: user._id } });
      return response.status(200).json((await currentUser.populate("following")).following);
    } else {
      await currentUser.updateOne({ $push: { following: id } });
      await othertUser.updateOne({ $push: { followers: user._id } });
      return response.status(200).json((await currentUser.populate("following")).following);
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}
