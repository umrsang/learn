class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: new Date() ,
      count: 0
    };
    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  handleClick() {
    this.setState(state => ({
      count:  this.state.count + 1
    }));
    console.log(this.state.count)
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2 onClick={this.handleClick}>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h2>click count {this.state.count}</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);