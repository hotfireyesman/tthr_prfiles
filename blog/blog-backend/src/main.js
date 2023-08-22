require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT, MONGO_URI} = process.env;

const app = new Koa();
const router = new Router();

mongoose
.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.error(e);
    });

//api 라우트 적용
router.use('/api', api.routes())

router.get('/', ctx => {
    ctx.body = '홈';
})
router.get('/about', ctx => {
    ctx.body = '소개';
})
router.get('/about/:name?', ctx => {
    const {name} = ctx.params;
    ctx.body = name ? `${name}의 소개` : '소개';
})
router.get('/posts', ctx => {
    const { id } = ctx.query;
    ctx.body = id ? `포스트 #${id}` : `포스트 아이디가 없습니다`;
})
//라우터 적용 전에 bodyParser적용
app.use(bodyParser())

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})