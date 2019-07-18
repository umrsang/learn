'use strict';

var oo1 = {
  text: 'hello',
  log: function log() {
    console.log(this.text);
  }
};

oo1.log();