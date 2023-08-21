import CounterContainer from "./containers/CounterContainer";
import SampleContainer from "./containers/SampleContainer";

const App = () => {
  return (
    <div>
      <div>
        <CounterContainer />
      </div>
      <hr/>
      <div>
        <SampleContainer />
      </div>
    </div>
  )
}

export default App;