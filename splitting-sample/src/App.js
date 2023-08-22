import logo from './logo.svg';
import './App.css';
import {useState, Suspense, Component} from 'react';

/*
class App extends Component {
  state = {
    SplitMe: null
  };

  handleClick = async () => {
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadedModule.default
    })
  };

  render() {
    const {SplitMe} = this.state;
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p onClick={this.handleClick}>ㅇㅁㅇ</p>
          {SplitMe && <SplitMe />}
        </header>
      </div>
    )
  }
}
*/

//서스펜스 사용
/*
const SplitMe = React.lazy(() => import('./SplitMe'));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo'/>
        <p onClick={onClick}>ㅇㅁㅇ</p>
        <Suspense fallback={<div>loading . . .</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  )
}
*/

//loadable/component

import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading . . .</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  //preload
  const onMouseOver = () => {
    SplitMe.preload();
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo'/>
        <p onClick={onClick} onMouseOver={onMouseOver}>ㅇㅁㅇ</p>
        {visible && <SplitMe />}
      </header>
    </div>
  )
}

export default App;