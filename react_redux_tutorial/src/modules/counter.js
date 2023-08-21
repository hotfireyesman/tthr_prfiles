/*
//액션 타입 정의
const INCRAESE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = () => ({ type: INCRAESE });
export const decrease = () => ({ type: DECREASE });

//초기상태, 리듀서
const initialState = {
    number: 0
};

function counter(state = initialState, action){
    switch(action.type) {
        case INCRAESE:
            return {
                number: state.number + 1
            }
        case DECREASE:
            return {
                number: state.number - 1
            }
        default:
            return state;
    }
}

export default counter;
*/

//redux-actions 적용
import {createAction, handleActions} from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
    number: 0,
}

const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({number: state.number + 1}),
        [DECREASE]: (state, action) => ({number: state.number - 1}),
    },
    initialState,
);

export default counter;