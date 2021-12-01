const jwt = require("jsonwebtoken");
const Users = require("../models/users");

// 유저 인증에 실패하면 401 상태 코드를 반환한다.
module.exports = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        const [tokenType, tokenValue] = authorization.split(' ');
        if (tokenType !== 'Bearer') {
            res.status(401).send({
                errorMessage: "로그인 후 사용하세요.",
            });
            return;
        }
        const {userId} = jwt.verify(tokenValue, 'hyeop-secret-key');
        Users.findOne({ userId }).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};