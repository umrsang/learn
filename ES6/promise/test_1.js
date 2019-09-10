var m1 = function(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('m1 timeout')
    }, 1000);
    console.log('m1 start');
  })
}

var m2 = function(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      reject('m2 timeout')
      // throw  new Error('m2 error')
    }, 1000);
    console.log('m2 start');
  })
}

m1().then(()=>{
  console.log('then1 ');
  return m2()
}).then(()=>{
  console.log('then2');
}, (text)=>{
  console.log('text', text);
  console.log('reject2');
}).catch((error)=>{
  console.log(error);
})