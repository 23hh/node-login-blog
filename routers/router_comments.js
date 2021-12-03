const express = require("express");
const Posts = require("../models/posts");
const Users = require("../models/users");
const Comments = require("../models/comments");
const authMiddleware = require("../middlewares/auth_middleware");
const Joi = require("joi");

const router = express.Router();

//게시물에 댓글조회
router.get("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ postId }).sort("-date");
    res.json({comments});
  } catch (error) {
      next();
  }
});

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

//댓글 작성
router.post("/:postId", authMiddleware, async (req, res, next) => {
    const { postId } = req.params;
    const nickname = res.locals.user.nickname;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    console.log(postId, nickname, userId, comment)

    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    await Comments.create({ postId, nickname, userId, comment, date });
});

//댓글 수정
router.patch("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  const { comment } = req.body;

  const updateComment = await Comments.find({ commentId });
  if (updateComment.length > 0) {
    await Comments.updateOne({ commentId: commentId }, { $set: { comment } });
  }
  res.send({ result: "success" });
});

//댓글 삭제
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  const deleteComment = await Comments.find({ commentId });
  if (deleteComment.length > 0) {
    await Comments.deleteOne({ commentId });
  }
  res.send({ result: "success" });
});

module.exports = router;
