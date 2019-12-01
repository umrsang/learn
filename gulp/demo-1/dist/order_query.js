'use strict';

var oo1 = {
  text: 'hello',
  log: function log() {
    console.log(this.text);
  }
};

oo1.log();

var log = function log(text) {
  console && console.log(text);
};