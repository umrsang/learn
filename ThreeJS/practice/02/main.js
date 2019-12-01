$(function () {
  //初始化场景
  var scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xffffff, 0.015, 200);

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
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
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.y = 0 * Math.PI;
  plane.rotation.z = 0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  var spotLight = new THREE.SpotLight(0xffffff, 1, 0);
  spotLight.position.set(-100, 100, 100);
  spotLight.castShadow = true;
  scene.add(spotLight);


  $("#app").append(renderer.domElement)

  function initState() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = 0;
    stats.domElement.style.top = 0;
    $("#app").append(stats.domElement);
    return stats;
  }
  var stats = initState()


  var controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.02;

    this.addCube = function () {
      var cubeSize = Math.ceil(1 + Math.random() * 3)

      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.name = "cube-" + scene.children.length;
      cube.castShadow = true;

      cube.position.z = -30 + Math.round(planeGeometry.parameters.width * Math.random());
      cube.position.y = 0 + Math.round(Math.random() * 10);
      cube.position.x = -10 + Math.round(planeGeometry.parameters.height * Math.random());

      console.log(cube.position)

      scene.add(cube);
      // this.numberOfObjects = scene.children.length;
      // console.log(scene.children)
    }
  }
  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5)
  gui.add(controls, "bouncingSpeed", 0, 0.5)
  gui.add(controls, "addCube")

  var step = 0;

  function renderScene() {
    stats.update();

    step += controls.bouncingSpeed

    if (camera instanceof THREE.Camera) {
      var x = 20 + ( 10 * (Math.sin(step)));
      camera.lookAt(new THREE.Vector3(x, 10, 0));
    }

    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e != plane) {

        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
  renderScene()
})