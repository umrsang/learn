import React, { Component } from 'react';

import 'antd/dist/antd.css'
import './App.less';

import Main from './pages/main/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main></Main>
      </div>
    );
  }
}

export default App;
