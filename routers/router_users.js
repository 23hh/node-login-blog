const express = require("express");
const Joi = require("joi");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth_middleware");

const router = express.Router();


router.get('/me', authMiddleware, async (req, res) => {
    const user = res.locals.user;
  
    if (user === null) {
      res.status(401).send('로그인이 필요합니다.');
      return;
    }
    res.status(200).send({
      user: {
        nickname: user.nickname,
      },
    });
  });

module.exports = router;