var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 3;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();
  for (let i = 0; i < 1; i++) {
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  // mesh.rotation.z += 0.03;

  renderer.render(scene, camera);
}
