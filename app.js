var camera, scene, renderer, lightSource;
var geometry, material;
var cubes = [];
var cubeGroup = new THREE.Group();

// const boxDimensions = 0.2;
const boxDimensions = 2;

var dark = new THREE.Color(0x1c1c1c);
var grey = new THREE.Color(0x808080);
var light = new THREE.Color(0xececec);

// var colorChangeMultiplier = 0.0;
// var colorChange = [
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // 1 * colorChangeMultiplier,
  // 1 * colorChangeMultiplier,
  // 1 * colorChangeMultiplier,
  // 1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
  // -1 * colorChangeMultiplier,
// ];

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
  // camera.position.y -= 0.6
  camera.position.z = 80;

  lightSource = new THREE.PointLight(0xffffff, 1, 20);
  lightSource.position.set(0, 10, 10);
  lightSource1 = new THREE.PointLight(0xffffff, 1, 20);
  lightSource1.position.set(10, 0, 10);

  scene = new THREE.Scene();
  scene.add(lightSource);
  scene.add(lightSource1);
  scene.add(cubeGroup);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
  var geometry = new THREE.BoxGeometry(
    boxDimensions,
    boxDimensions,
    boxDimensions
  );

  // var dark = "#1C1C1C";
  // var grey = "#808080";
  // var light = "#ECECEC";
  // geometry.faces[0].color.set(light);
  // geometry.faces[1].color.set(light);
  // geometry.faces[2].color.set(light);
  // geometry.faces[3].color.set(light);
  // geometry.faces[4].color.set(dark);
  // geometry.faces[5].color.set(dark);
  // geometry.faces[6].color.set(dark);
  // geometry.faces[7].color.set(dark);
  // geometry.faces[8].color.set(grey);
  // geometry.faces[9].color.set(grey);
  // geometry.faces[10].color.set(grey);
  // geometry.faces[11].color.set(grey);
  toPush = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial()
    // new THREE.MeshBasicMaterial({
    // vertexColors: THREE.FaceColors,
    // })
    // new THREE.MeshBasicMaterial([{ color: "orange", color: "green" , color: "blue" }])
    // new THREE.MeshToonMaterial()
    // new THREE.MeshBasicMaterial()
  );
  // toPush.geometry.colorsNeedUpdate = true;

  toPush.rotateX(Math.PI / 4);
  toPush.rotateY(Math.PI / 4);

  toPush.position.x = x;
  toPush.position.y = y;
  toPush.position.z = z;

  // toPush.rotation.x += .02;

  scene.add(toPush);
  cubeGroup.add(toPush)
  
  cubes.push(toPush);

  // var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
}

function loop() {
  requestAnimationFrame(loop);

  // camera.position.z += 0.01 * mult;
  // if (camera.position.z > 10 || camera.position.z < 3) mult = mult * -1;

  // for (cube of cubes) {
  // for (let face = 0; face < cubes[0].geometry.faces.length; face += 2) {
  // cubes[0].geometry.faces[0].color.r
  // curColor = cube.geometry.faces[face].color.r;
  // cube.geometry.faces[face].color.addScalar(colorChange[face]);
  // cube.geometry.faces[face + 1].color.addScalar(colorChange[face + 1]);
  // if (curColor > light.r || curColor < dark.r) {
  // colorChange[face] *= -1;
  // colorChange[face + 1] *= -1;
  // }
  // console.log(colorChange[face])
  // }
  // cube.geometry.colorsNeedUpdate = true;
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.02;
  // cube.rotation.y += 0.02;
  // console.log(cube.rotation.y)
  // }
  // camera.rotation.z += 0.02;
  cubeGroup.rotation.z += 0.01;


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
initCube(
  boxDimensions + horiChange + 0.225,
  boxDimensions - vertChange - 1.61,
  0
);
initCube(
  -boxDimensions - vertChange - 0.425,
  -boxDimensions + horiChange + 1.41,
  0
);

loop();
