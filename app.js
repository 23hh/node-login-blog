const express = require('express');
const logger = require('morgan');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const express_router = require('./routers');
const express_render = require('./renders');
app.use(express.static("assets"));

mongoose.connect('mongodb://localhost:27017/login-pro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', express_render); //Render 폴더 적용
app.use('/api', express_router); //Router 폴더 적용


app.listen(port, () => {
  console.log('연결이 완료 되었습니다.');
});