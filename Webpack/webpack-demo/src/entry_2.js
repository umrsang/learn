import _ from 'lodash';
import './assets/style/style.css';
import './assets/sass/color.scss';
import './assets/sass/weight.scss';
import Icon from './assets/img/qr.png';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack', ", pageTwo"], ' ');
  element.classList.add('hello');
  element.classList.add('c_yel');
  element.classList.add('bold');
  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  
  console.log(Icon);
  return element;
}

document.body.appendChild(component());