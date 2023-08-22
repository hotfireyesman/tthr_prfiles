//배열에 값을 저장
/*
let postId = 1; //초기값

const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    }
]
*/

/* 포스트 작성
POST /api/posts
{title, body}
*/

/*
export const write = ctx => {
    const { title, body } = ctx.request.body; //REST API의 request body 조회
    postId += 1;
    const post = {id:postId, title, body};
    posts.push(post);
    ctx.body = post;
}
*/

/* 포스트 목록 조회
GET /api/posts
*/

/*
export const list = ctx => {
    ctx.body = posts;
}
*/

/* 특정 포스트 조회
GET /api/posts/:id
*/

/*
export const read = ctx => {
    const {id} = ctx.params;
    //id가 문자열이므로 파라미터를 숫자로 변환하거나 비교할 p.id값을 문자열로 변경
    const post = posts.find(p => p.id.toString() === id);
    if(!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        }
        return;
    }
    ctx.body = post;
}
*/

/* 특정 포스트 제거
DELETE /api/posts/:id
*/

/*
export const remove = ctx => {
    const {id} = ctx.params;
    //해당 id를 가진 post가 몇번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id);
    if (index === -1) { //없으면
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        }
        return;
    }
    //index번째 아이템 제거
    posts.splice(index, 1);
    ctx.status = 204; //No content
}
*/

/* 포스트 수정, 교체
PUT /api/posts/:id
{ title, body }
*/

/*
export const replace = ctx => {
    const {id} = ctx.params
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        }
        return;
    }
    //전체 객체 덮어씌움
    posts[index] = {
        id,
        ...ctx.request.body,
    }
    ctx.body = posts[index];
}
*/

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{ title, body }
*/

/*
export const update = ctx => {
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        }
        return;
    }
    //기존 값에 정보를 덮어씌움
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index]
}
*/

//MongoDB에 저장
import Post from "../../models/post";

export const write = async ctx => {
    const {title, body, tags} = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
    });

    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const list = ctx => {};

export const read = ctx => {};

export const remove = ctx => {};

export const update = ctx => {};