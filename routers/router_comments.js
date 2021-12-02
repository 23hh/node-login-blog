const express = require("express");
const Posts = require("../models/posts");
const Users = require("../models/users");
const Comments = require("../models/comments");
const authMiddleware = require("../middlewares/auth_middleware");
const Joi = require("joi");
const router = express.Router();


module.exports = router;