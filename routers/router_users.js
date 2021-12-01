const express = require("express");
const Joi = require("joi");

const router = express.Router();
const authMiddleware = require("../middlewares/auth_middleware");

router.get('/me', authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user
  });
});

module.exports = router;