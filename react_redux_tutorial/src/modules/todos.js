/*
//액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//액션 생성 함수
export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
})
let id = 3;
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
})
export const toggle = id => ({
    type: TOGGLE,
    id
})
export const remove = id => ({
    type: REMOVE,
    id
});

//초기상태, 리듀서
const initialState = {
    input: '',
    todos:[
        {
            id:1,
            text:'리덕스',
            done:true
        },
        {
            id:2,
            text:'일2',
            done:false
        }
    ]
}

function todos(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            }
        case INSERT:
            return {
                ...state,
                todos: state.todo.concat(action.todo)
            }
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id ? { ...todo, done: !todo.done } : todo)
            }
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        default:
            return state;
    }
}

export default todos;
*/

//redux-action 적용
import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
    input: '',
    todos:[
        {
            id:1,
            text:'리덕스',
            done:true
        },
        {
            id:2,
            text:'일2',
            done:false
        }
    ]
}

const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, action) => ({...state, input: action.payload}), // 비구조화할당 (state, [payload: input]) => ({...state, input}),
        [INSERT]: (state, action) => ({
            ...state,
            todos: state.todos.concat(action.payload),
        }),
        [TOGGLE]: (state, action) => ({
            ...state,
            todos: state.todos.map(todo =>
                todo.id === action.payload ? {...todo, done: !todo.done} : done),
        }),
        [REMOVE]: (state, action) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload),
        }),
    },
    initialState,
)

export default todos;

//redux-action + immer 적용
/*
import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';


export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
    input: '',
    todos:[
        {
            id:1,
            text:'리덕스',
            done:true
        },
        {
            id:2,
            text:'일2',
            done:false
        }
    ]
}

const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) =>
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT]: (state, { payload: todo }) =>
            produce(state, draft => {
                draft.todos.push(todo);
            }),
        [TOGGLE]: (state, { payload: id }) =>
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE]: (state, { payload: id }) =>
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
            })
    },
    initialState,
)

export default todos;
*/