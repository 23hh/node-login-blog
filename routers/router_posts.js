const express = require("express");
const router = express.Router();

const Posts = require("../models/posts");

router.route("/").get(async (req, res, next) => {
  const posts = await Posts.find({}).sort("-date");
  res.json({ posts: posts });
});

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.route("/").get(async (req, res) => {
  const { title, content } = req.body;
  const date = moment().format('YYYY-MM-DD HH:mm:ss');

  isExist = await Posts.find({ title });
  if (isExist.length == 0) {
    await Posts.create({ title, content, date });
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'error' });
  }
});

module.exports = router;
