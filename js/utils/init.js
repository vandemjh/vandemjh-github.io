/**
 * Initializes commonly used variables and methods
 **/

export var camera, scene, renderer;

export function initUtil() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  // camera.position.z = 50;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

export function loopUtil() {
  // requestAnimationFrame(loop);
  renderer.render(scene, camera);
}

// init();
// loop();
