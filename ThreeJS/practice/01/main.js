
$(function(){
  //初始化场景
  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.set(50, 50, 50);
  camera.lookAt(scene.position)
  scene.add(camera);

  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee);
  renderer.shadowMapEnabled = true;

  //添加平面
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneBufferGeometry(60, 20, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  var shpereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var shpereMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
  var shpere = new THREE.Mesh(shpereGeometry, shpereMaterial);
  shpere.position.x = 0;
  shpere.position.y = 4;
  shpere.position.z = 0;
  shpere.castShadow = true;
  scene.add(shpere);


  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = 20;
  cube.position.y = 2;
  cube.position.z = 0;
  cube.castShadow = true;
  scene.add(cube);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, 40);
  spotLight.castShadow = true;
  scene.add(spotLight);

  $("#app").append(renderer.domElement)

  function initState(){
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = 0;
    stats.domElement.style.top = 0;
    $("#app").append(stats.domElement);
    return stats;
  }
  var stats = initState()


  function initStats(){
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = 0;
    stats.domElement.style.top = 0;
    $("#app").append(stats.domElement);
    return stats;
  }
  var stats = initStats()

  var controls = new function(){
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.02;
  }
  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5)
  gui.add(controls, "bouncingSpeed", 0, 0.5)

  var step = 0;
  function renderScene(){
    stats.update();

    cube.rotation.x += controls.rotationSpeed;

    step += controls.bouncingSpeed
    shpere.position.x = 2 + (10*Math.cos(step));
    shpere.position.y = 2 + (10*Math.abs(Math.sin(step)));

    cube.position.x = 20 + (10*Math.cos(step));
    cube.position.y = 2 + (10*Math.abs(Math.sin(step)));

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
  renderScene()
})