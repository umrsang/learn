import tools from './modules/tools';
// import './style.css';
// import Icon from './pic.png';

// function component() {
//   var element = document.createElement('div');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');
//   // 将图像添加到我们现有的 div。
//   var myIcon = new Image();
//   myIcon.src = Icon;

//   element.appendChild(myIcon);

//   console.log(Icon);
//   return element;
// }

// document.body.appendChild(component());
var time = tools.getTime()
console.log(time)

export default {
  time: time
}