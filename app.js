var camera, scene, renderer;
var geometry, material;
var cubes = [];

// const boxDimensions = 0.2;
const boxDimensions = 2;

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
  camera.position.z = 50;

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
  // #1C1C1C - Dark
  // #808080 - Grey
  // #ECECEC - Light
  geometry.faces[0].color.set("#ECECEC");
  geometry.faces[1].color.set("#ECECEC");
  geometry.faces[2].color.set("#808080");
  geometry.faces[3].color.set("#808080");
  geometry.faces[4].color.set("#1C1C1C");
  geometry.faces[5].color.set("#1C1C1C");
  geometry.faces[8].color.set("#ECECEC");
  geometry.faces[9].color.set("#ECECEC");
  geometry.faces[6].color.set("#1C1C1C");
  geometry.faces[7].color.set("#1C1C1C");
  geometry.faces[10].color.set("#808080");
  geometry.faces[11].color.set("#808080");
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

  toPush.rotateX(Math.PI / 4);
  toPush.rotateY(Math.PI / 4);

  toPush.position.x = x;
  toPush.position.y = y;
  toPush.position.z = z;

  // toPush.rotation.x += .02;

  scene.add(toPush);
  cubes.push(toPush);

  // var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
}

function loop() {
  requestAnimationFrame(loop);

  // camera.position.z += 0.01 * mult;
  // if (camera.position.z > 10 || camera.position.z < 3) mult = mult * -1;

  for (cube of cubes) {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.02;
    // cube.rotation.y += 0.02;
    // console.log(cube.rotation.y)
  }
  camera.rotation.z += 0.002;

  renderer.render(scene, camera);
}


init();

initCube(0, 0, 0);
var snug = 0.1;
var horiChange = boxDimensions / 4 + snug;
var vertChange = boxDimensions / 4 - snug;
initCube(boxDimensions - horiChange, boxDimensions + vertChange, 0);
initCube(-boxDimensions + horiChange, boxDimensions + vertChange, 0);
initCube(boxDimensions - horiChange, -boxDimensions - vertChange, 0);
initCube(-boxDimensions + horiChange, -boxDimensions - vertChange, 0);
initCube(boxDimensions + horiChange + 0.225, boxDimensions - vertChange - 1.61, 0);
initCube(
  -boxDimensions - vertChange - 0.425,
  -boxDimensions + horiChange + 1.41,
  0
);

// console.log(cubes[0].

// cubeNum = 4;
// for (let i = -cubeNum; i < cubeNum; i += boxDimensions) {
// for (let j = -cubeNum; j < cubeNum; j += boxDimensions) {
// initCube(i, j, 0);
// }
// }

// console.log(cubes[0].position.x);
// cubes[0].position.x += 100;
// console.log(cubes[0].position.x);
loop();
