const { StatusCodes } = require("http-status-codes");

const PostModel = require("../model/Post-model");
const { UnaunthenticatedError, BadRequestError, NotFoundError } = require("../errors/error-index");

exports.createPost = async (req, res, next) => {
  const post_user = req.body.user;
  const logged_user = req.user._id.toString();

  if (post_user !== logged_user)
    throw new UnaunthenticatedError("Your don't have authorization to create this post");

  const saved_post = await PostModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(saved_post);
};

exports.getAllPost = async (req, res, next) => {
  const posts = await PostModel.find({ user: req.user._id })
    .populate("user", "firstName lastName username picture gender")
    .sort({ createdAt: "desc" });
  console.log(posts);
  if (!posts) throw NotFoundError("User has not created any posts");
  res.status(StatusCodes.OK).json(posts);
};
