const express = require("express");
const Joi = require("joi");
const Users = require("../models/users");

const router = express.Router();

// nickname = /^[a-zA-Z0-9]{3,10}$/;
// password = /^[a-zA-Z0-9]{4,30}$/;


const UsersSchema = Joi.object({
    nickname: Joi.string().required().min(3).alphanum(),
    password: Joi.string().required().min(4),
    confirmPassword: Joi.string().required(),
  });
  
  router.post('/', async (req, res) => {
    try {
      const { nickname, password, confirmPassword } =
        await UsersSchema.validateAsync(req.body);
  
      if (password !== confirmPassword) {
        res.status(400).send('패스워드가 패스워드 확인란과 동일하지 않습니다.');
        return;
      }
  
      if (password.includes(nickname)) {
        res.status(400).send('요청한 데이터 형식이 올바르지 않습니다');
        return;
      }
  
      
      const existUsers = await Users.find({
        nickname,
      });
      if (existUsers.length) {
        res.status(400).send('이미 가입된 이메일 또는 닉네임이 있습니다.');
        return;
      }
  
      const user = new Users({ nickname, password });
      await user.save();
  
      res.status(201).send('가입을 축하드립니다.');
    } catch (err) {
      res.status(400).send('요청한 데이터 형식이 올바르지 않습니다.');
    }
  });
  

module.exports = router;