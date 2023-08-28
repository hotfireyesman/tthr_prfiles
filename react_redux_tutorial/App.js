import Counter from "./components/Counter";
import Todos from "./components/Todos";
import CounterContainer from "./containers/CounterContainer";
import counter, {increase, decrease} from "./modules/counter";

const App = () => {
    return(
        <div>
            <CounterContainer />
            <hr/>
            <Todos />
        </div>
    )
}

export default App;