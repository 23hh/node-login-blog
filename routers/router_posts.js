const express = require("express");
const Posts = require("../models/posts");
const Users = require("../models/users");
const Comments = require("../models/comments");
const authMiddleware = require("../middlewares/auth_middleware");
const Joi = require("joi");
const router = express.Router();

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

//게시물 정보 조회
router.route("/").get(async (req, res, next) => {
  const posts = await Posts.find({}).sort("-date");
  res.json({ posts: posts });
});

var moment = require("moment");
require("moment-timezone");
``;
moment.tz.setDefault("Asia/Seoul");

//게시글저장
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = await req.body;
  const nickname = res.locals.user.nickname;
  const userId = res.locals.user.userId;

  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  await Posts.create({ nickname, userId, title, content, date });
  res.send({ result: "success" });
});

//상세페이지조회
router.get("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ postId: postId }).exec();
    res.json({ detail: post });
  } catch (error) {
    res.render("error");
  }
});

//게시글 수정
router.patch("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const isIdInBoard = await Posts.find({ postId });
    if (isIdInBoard.length > 0) {
      await Posts.updateOne({ postId: postId }, { $set: { title, content } });
    }
    res.send({ result: "success" });
});


router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  const isIdInBoard = await Posts.find({ postId });
  if (isIdInBoard.length > 0) {
    await Posts.deleteOne({ postId });
  }
  res.send({ result: "success" });
});

module.exports = router;
