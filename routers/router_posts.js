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

router.route("/").get(async (req, res, next) => {
  const posts = await Posts.find({}).sort("-date");
  res.json({ posts: posts });
});

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = await req.body;
  const nickname = res.locals.user.nickname;
  const userId = res.locals.user.userId;
  console.log(nickname)

  const date = moment().format('YYYY-MM-DD HH:mm:ss');

  await Posts.create({ nickname, userId, title, content, date});
  res.send({ result: 'success' });
});

module.exports = router;