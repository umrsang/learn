import React from 'react'
import {Button, Input } from "antd"

export default class Life extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return <div> 
      <h1 className="">
        <a href="http://baidu.com">点击一次啊</a>
      </h1>
      <Input></Input>
      <Button>点击一次啊</Button>
    </div>
  }
}