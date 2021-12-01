const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    res.status(401).send('로그인 후 사용하세요.');
    return;
  }
  if (tokenValue === 'null') {
    res.locals.user = null;
    next();
    return;
  }
  try {
    const { nickname } = jwt.verify(tokenValue, 'hyeop-secter-key');
    User.findOne({ nickname: nickname }).then((user) => {
      res.locals.user = user;
      console.log('로그인 성공 또는 인증 성공');
      next();
    });
  } catch (error) {
    res.status(401).send('로그인 후 사용하세요.');
    return;
  }
};