import { createAction, handleActions } from "redux-actions";
import * as api from '../lib/api';
import createRequestThunk from "../lib/createRequestThunk";
import { call, put, takeLatest } from 'redux-saga/effects';
import { startLoading, finishLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga";

//액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

/*
//thunk함수 생성
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
*/
/*
export const getPost = id => async dispatch => {
    dispatch({type: GET_POST});
    try{
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        }); //요청 성공
    } catch(e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        })
        throw e;
    }
}

export const getUsers = () => async dispatch => {
    dispatch({type: GET_USERS})
    try{
        const response = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload:response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        })
        throw e;
    }
}
*/

//비동기 API요청 상태 관리하기
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

//리팩토링 전
/*
function* getPostSaga(action) {
    yield put(startLoading(GET_POST));
    //파라미터로 action을 받아와서 액션의 정보를 조회함
    try {
        //call을 사용, Promise를 반환하는 함수 호출
        const post = yield call(api.getPost, action.payload);
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        })
    } catch (e) {
        yield put({
            type:GET_POST_FAILURE,
            payload: e,
            error: true
        })
    }
    yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
    yield put(startLoading(GET_USERS));
    try {
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        })
    } catch (e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        })
    }
    yield put(finishLoading(GET_USERS))
}
*/

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}


//초기상태 선언
const initialState = {
    post: null,
    users: null,
}
/*
const sample = handleActions(
    {
        [GET_POST]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true //요청 시작
            }
        }),
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false //요청 완료
            },
            post: action.payload
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false
            }
        }),
        [GET_USERS]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: true
            }
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false
            },
            users: action.payload
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false
            }
        })
    },
    initialState
)
*/

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    },
    initialState
);

export default sample;