var webGLRenderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: false
});
webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMap.enabled = true;
webGLRenderer.setClearColor(0x666666);

$("#app").append(webGLRenderer.domElement)

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 780
camera.position.y = 82

camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();
scene.add(camera);


// var spotLight = new THREE.SpotLight(0xffffff, 1, 0);
// spotLight.position.set(0, 100, 0);
// spotLight.castShadow = true;
// scene.add(spotLight);


// add spotlight for the shadows
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 40, 30);
spotLight.intensity = 2;
spotLight.castShadow = true;
scene.add(spotLight);

// var ambiLight = new THREE.AmbientLight(0x141414);
// scene.add(ambiLight);
var ambientLight = new THREE.AmbientLight(0xb8edfd, 2.3);
scene.add(ambientLight);

var planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xaaaaaa,
  side: THREE.DoubleSide
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

plane.rotation.x = -Math.PI / 2;

plane.receiveShadow = true;
scene.add(plane);

var CubeGemo = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1)
var CubeMaterial = new THREE.MeshLambertMaterial({
  color: 0x03A9F4
  // color: 0xff0000
})
var Cube = new THREE.Mesh(CubeGemo, CubeMaterial);
Cube.position.y = 10
Cube.castShadow = true;
scene.add(Cube);


var loader = new THREE.OBJMTLLoader();

// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
var tableArray = []
var table, modeObject;

modeObject = new THREE.Object3D();
scene.add(modeObject);
table = new THREE.Object3D();

table.name = 'table';
scene.add(table);
table.rotation.x = 14 * Math.PI / 180;
table.position.y = 0

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    //mumaProgress(Math.round(percentComplete, 2))
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};

var onError = function (xhr) {};

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./img/che/');
mtlLoader.load('Toyota Camry XSE 2018.mtl', function (materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('./img/che/');
  objLoader.load('Toyota Camry XSE 2018.obj', function (object) {
    for (k in object.children) {
      //	object.children[k].material
      createShine(object)
    }
    var sphere = new THREE.SphereGeometry(5, 16, 8);
    var light3 = new THREE.SpotLight(0x254466, 3, 2000);
    //light3.decay =2
    light3.penumbra = 1
    light3.position.set(-500, 500, 0);
    getPointLightPos(-500, 500, 0, object)
    object.add(light3)

    var light4 = new THREE.SpotLight(0x254466, 3, 2200);
    light4.decay = 2
    light4.penumbra = 1
    light4.position.set(500, 500, 0);
    getPointLightPos(500, 500, 0, object)
    object.add(light4);

    var light5 = new THREE.PointLight(0xfe4545, 80, 35);
    //light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
    console.log(light5)
    light5.position.set(-65, 50, -65);
    // getPointLightPos(-65, 50, -65, object)
    light5.decay = 2
    light5.penumbra = 1
    object.add(light5);

    var light6 = new THREE.PointLight(0xfe4545, 70, 30);
    //light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
    light6.position.set(80, 70, 30);
    // getPointLightPos(80, 70, 30, object)
    light6.decay = 2
    light6.penumbra = 1
    object.add(light6);

    object.rotation.y = -135 * Math.PI / 180
    object.name = 1
    tableArray.push(object)
    for (var i = 1; i <= 0; i++) {
      var tempMesh = tableArray[0].clone();
      tempMesh.name = i + 1
      if (i == 1) {
        tempMesh.position.x = -260
      }
      if (i == 2) {
        tempMesh.position.z = -260
      }
      if (i == 3) {
        tempMesh.position.x = 260
      }
      tableArray.push(tempMesh)
      table.add(tempMesh)
    }
    rotationTable = tableArray[0]
    object.position.z = 250
    table.add(object)
  }, onProgress, onError);
})


function getPointLightPos(x, y, z, parent) {

  var CubeGemo = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1)
  var CubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  })
  var Cube3 = new THREE.Mesh(CubeGemo, CubeMaterial);
  Cube3.position.set(x, y, z);
  parent.add(Cube3);

}


function createShine(object) {
  var texture = new THREE.ImageUtils.loadTexture('./img/shine.png')
  texture.minFilter = THREE.LinearFilter;
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });
  material.blending = THREE.AdditiveBlending
  material.side = THREE.DoubleSide
  var width = 98
  var height = 40
  var geometry = new THREE.PlaneGeometry(width, height);

  var sprite = new THREE.Mesh(geometry, material);
  sprite.position.y = 65
  sprite.position.x = 0
  sprite.position.z = 49

  var sprite2 = sprite.clone();
  sprite2.rotation.y = 90 * Math.PI / 180
  sprite2.position.x = 49
  sprite2.position.z = 0

  var sprite3 = sprite.clone();
  sprite3.rotation.y = 90 * Math.PI / 180
  sprite3.position.x = -49
  sprite3.position.z = 0

  var sprite4 = sprite.clone();
  sprite4.position.x = 0
  sprite4.position.z = -49

  object.add(sprite)
  object.add(sprite2)
  object.add(sprite3)
  object.add(sprite4)
  console.log(sprite)
}




var trackballControls = new THREE.TrackballControls(camera);

trackballControls.rotateSpeed = 1.0;
trackballControls.zoomSpeed = 1.0;
trackballControls.panSpeed = 1.0;
trackballControls.staticMoving = true;


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

var clock = new THREE.Clock();

function renderScene() {
  Cube.rotation.x += 0.01;
  Cube.rotation.y += 0.01;


  var delta = clock.getDelta();
  trackballControls.update(delta);

  stats.update();
  requestAnimationFrame(renderScene)
  webGLRenderer.render(scene, camera);
}
renderScene()