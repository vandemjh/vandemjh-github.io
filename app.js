var camera, scene, renderer;
var geometry, material;
var cubes = [];

const boxDimensions = 0.2;

var mult = 1;

window.onresize = function () {
  location.reload();
  // could just change the window.innerWidth and height here...
};

function init() {
  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.z = 3;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
  toPush = new THREE.Mesh(
    new THREE.BoxGeometry(boxDimensions, boxDimensions, boxDimensions),
    new THREE.MeshNormalMaterial()
  );
  toPush.position.x = x;
  toPush.position.y = y;
  toPush.position.z = z;

  scene.add(toPush);
  cubes.push(toPush);

  // var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
}

function loop() {
  requestAnimationFrame(loop);

  camera.position.z += 0.01 * mult;
  if (camera.position.z > 10 || camera.position.z < 3) mult = mult * -1;

  for (cube of cubes) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}

init();
initCube(0, 0, 0);
initCube(0.1, 0.1, 0, 0.1);
initCube(-0.1, 0.1, 0, -0.1);
initCube(0.1, -0.1, 0, 0.1);
initCube(-0.1, -0.1, 0, -0.1);

// console.log(cubes[0].position.x);
// cubes[0].position.x += 100;
// console.log(cubes[0].position.x);
loop();
