const mongoose = require("mongoose");

const connect = () => {
    mongoose
        // mongodb://localhost:27017/login-pro
        // mongodb://test:test@localhost:27017/admin
        .connect(" mongodb://localhost:27017/login-pro", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true
        })
        .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;