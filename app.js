const express = require('express');
const logger = require('morgan');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const express_router = require('./routers');
const express_render = require('./renders');
app.use(express.static("assets"));

const connect = require('./models');
connect();

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