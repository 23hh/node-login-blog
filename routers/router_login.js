const express = require("express");
const Joi = require("joi");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const users = await Users.findOne({ nickname, password }).exec(); 

    if (!users) {
      res.status(400).send({
        errorMessage: "닉네임 또는 패스워드가 잘못됐습니다.",
      });
      return; 
    }
    
    const token = jwt.sign({ userId: users['userId'] }, "hyeop-secret-key"); 

    res.send({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

module.exports = router;
