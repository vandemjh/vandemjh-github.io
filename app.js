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
  camera.position.z = 5;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
  // var face = [
  // new THREE.Color("black"),
  // new THREE.Color(0xff0000),
  // new THREE.Color(0xff0000),
  // new THREE.Color(0xff0000),
  // new THREE.Color(0xff0000),
  // new THREE.Color(0xff0000)
  // ];
  var geometry = new THREE.BoxGeometry(
    boxDimensions,
    boxDimensions,
    boxDimensions
  );
  for (var i = 0; i < geometry.faces.length; i += 2) {
  	randColor = Math.random() * 0xffffff
    geometry.faces[i].color.setHex(randColor);
    geometry.faces[i + 1].color.setHex(randColor);
  }
  toPush = new THREE.Mesh(
    geometry,
    // new THREE.BoxGeometry(boxDimensions, boxDimensions, boxDimensions),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: THREE.FaceColors,
    })
    // new THREE.MeshBasicMaterial([{ color: "orange", color: "green" , color: "blue" }])
    // new THREE.MeshToonMaterial()
    // new THREE.MeshBasicMaterial()
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

  // camera.position.z += 0.01 * mult;
  // if (camera.position.z > 10 || camera.position.z < 3) mult = mult * -1;

  for (cube of cubes) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}

offset = boxDimensions;
init();

// for (let i = -(window.innerWidth * 2); i < window.innerWidth * 2; i += offset) {
// for (
// let j = -(window.innerHeight * 2);
// j < window.innerHeight * 2;
// j += offset
// ) {
// console.log(i, j);
// initCube(i * boxDimensions / offset, j * boxDimensions / offset, 0);
// }
// }

initCube(0, 0, 0);
// alert(window.innerWidth / offset)
initCube(offset, offset, 0, offset);
initCube(-offset, offset, 0, -offset);
initCube(offset, -offset, 0, offset);
initCube(-offset, -offset, 0, -offset);

// console.log(cubes[0].position.x);
// cubes[0].position.x += 100;
// console.log(cubes[0].position.x);
loop();
