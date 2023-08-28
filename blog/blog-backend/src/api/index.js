import Router from 'koa-router';
import posts from './posts';
import auth from './auth/index';

const api = new Router();

api.get('/test', ctx => {
    ctx.body = '라우트 모듈화';
})

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

export default api;