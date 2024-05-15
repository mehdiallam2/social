export interface IDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IUser extends IDocument {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarURL: string;
  location: string;
  accupation: string;
  views: string;
  impressions: string;
  bio: string;
  posts: IPost[];
  following: IUser[];
  followers: IUser[];
}

export interface IPost extends IDocument {
  userId: IUser;
  media: string;
  visibility: string;
  location: string;
  content: string;
  likes: IUser[];
  comments: IComment[];
  shares: IUser[];
  hashtags: string[];
}

export interface IComment extends IDocument {
  userId: IUser;
  postId: IPost;
  content: string;
  likes: IUser[];
}
