var camera, scene, renderer;
var geometry, material, mesh;

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
}

function initCube(x, y, z) {
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();
  for (let i = 0; i < 1; i++) {
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  var points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  var line = new THREE.Line(geometry, material);
  scene.add(line);
}

function animate() {
  requestAnimationFrame(animate);

  camera.position.z += 0.01 * mult;
  if (camera.position.z > 10 || camera.position.z < 3) mult = mult * -1;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  // mesh.position.x += 0.001 * mult
  // mesh.position.y += 0.001 * mult * -1
  // mesh.position.z += 0.001 * mult * -1
  console.log(mesh.position);

  renderer.render(scene, camera);
}

init();
initCube();
animate();
