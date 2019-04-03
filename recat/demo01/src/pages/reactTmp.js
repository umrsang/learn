import React from 'react'
export default class Life extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  render() {
    return <div> 
      <span>这是子组件</span>
    </div>
  }
}