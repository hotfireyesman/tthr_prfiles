import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import { bindActionCreators } from 'redux';

const CounterContainer = ({number, increase, decrease}) => {
    return(
    <Counter number={number} onIncrease={increase} onDecrease={decrease}/>
    )
}

export default connect(
    state => ({
        number: state.counter.number,
    }),
    dispatch =>
        bindActionCreators(
            {
                increase,
                decrease,
            },
            dispatch,
        ),
)(CounterContainer);

/*
두번째 dispatch 파라미터를 객체 형태로 넣어주면
connect 함수가 내부적으로 bindActionCreators 작업을 대신해줌

export default connect(
    state => ({
        number: state.counter.number
    }),
    {
        increase,
        decrease,
    }
)(CounterContainer);
*/