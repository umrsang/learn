import React from 'react';
import Child from './reactTmp';

export default class Life extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }

  handleAdd = ()=>{
    this.setState({
      count: this.state.count + 1
    })
  }  

  render(){
    let style = {
      padding: "24px"
    }
    return <div style={style} >
      <button onClick={this.handleAdd}>点击一下</button>
      <p>{this.state.count}</p>
      <Child></Child>
    </div>
  }
}