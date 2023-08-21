import { createStore } from "redux";
//DOM reference
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

//액션타입, 액션생성함수 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE })

//초기값
const initialState = {
    toggle: false,
    counter: 0
};

//리듀서 함수 정의 state===undefined일때 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
    switch (action.type) {
        //액션 타입에 따라 다른 작업
        case TOGGLE_SWITCH:
            return {
                ...state, //불변성 유지
                toggle: !state.toggle
            }
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

//스토어 만들기
const store = createStore(reducer);

//render함수 만들기
const render = () => {
    const state = store.getState(); //getState: 현재 상태 불러오기
    //토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    //카운터처리
    counter.innerText = state.counter;
};

render()

//구독하기
//스토어의 상태가 바뀔 때마다 render함수 호출
store.subscribe(render);
//리덕스에서는 안써도됨

//디스패치
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
}
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}
btnDecrease.onclick = () => {
    store.dispatch(decrease());
}