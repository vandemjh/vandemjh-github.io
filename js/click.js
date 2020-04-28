var camera, scene, renderer, raycaster;

var mouse = new THREE.Vector2();
mouse.x = undefined;
mouse.y = undefined;

var cubeGroup = new THREE.Group();

document.addEventListener("mousemove", () => {
	event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false);
document.addEventListener("click", () => {
	multiplier *= -1;
	console.log(multiplier)
}, false);

const boxDimensions = 2;

var multiplier = 1;

window.onresize = function () {
    // location.reload();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};

function init() {
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    );
    camera.position.z = 10;
    scene = new THREE.Scene();
    scene.add(cubeGroup);
    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    raycaster = new THREE.Raycaster();

    document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
    var geometry = new THREE.BoxBufferGeometry(
        boxDimensions,
        boxDimensions,
        boxDimensions
    );
    var texture = new THREE.TextureLoader().load(
        "https://avatars1.githubusercontent.com/u/38433983?s=400&u=75d70a4e8d56d7323e874c204a1a652a8f1f58d2&v=4"
    );
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;

    mesh.rotateX(Math.PI / 4);
    mesh.rotateY(Math.PI / 4);

    cubeGroup.add(mesh);
    scene.add(mesh);
}

function loop() {
    requestAnimationFrame(loop);
	camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    if (raycaster.intersectObjects(scene.children).length > 0) {
    console.log("Intersect")
        // console.log(mouse)
        // console.log(raycaster.intersectObjects(scene.children));
    }
    cubeGroup.rotation.z += 0.002;
    cubeGroup.rotation.x += 0.02 * multiplier
    cubeGroup.rotation.y += 0.02 * multiplier
    cubeGroup.needsUpdate = true;


    cubeGroup.needsUpdate = true;

    renderer.render(scene, camera);
}

init();

initCube(0, 0, 0);

loop();
