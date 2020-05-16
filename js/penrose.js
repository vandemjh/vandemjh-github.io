var camera, scene, renderer, cubeGroup, counter, multiplier;
const sphereDimensions = 2;

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

function init() {
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );
    camera.position.z = 50;
    scene = new THREE.Scene();
    cubeGroup = new THREE.Group();
    outterCube = new THREE.Group();
    scene.add(cubeGroup);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    counter = 0;
    multiplier = 1;
}

function initCube(x, y, z) {
    var geometry = new THREE.BoxGeometry(2, 2, 2);

    mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    cubeGroup.add(mesh);
    return mesh;
}

function loop() {
    counter++;
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    cubeGroup.rotation.z += 0.002;
    cubeGroup.rotation.y += 0.003;
    if (counter > 200 && counter < 400) {
        cubeGroup.children.forEach((cube) => {
            cube.position.x *= 1.003;
            cube.position.y *= 1.003;
            cube.position.z *= 1.003;
        });
    }
    if (counter > 600 && counter < 800) {
        cubeGroup.children.forEach((cube) => {
            cube.position.x /= 1.003;
            cube.position.y /= 1.003;
            cube.position.z /= 1.003;
        });
    }
    if (counter > 1000) counter = 0;
}

function initCubes() {
    for (let i = -2; i <= 2; i++)
        for (let j = -2; j <= 2; j++)
            for (let k = -2; k <= 2; k++) {
                if (
                    i == -2 ||
                    i == 2 ||
                    j == -2 ||
                    j == 2 ||
                    k == -2 ||
                    k == 2
                ) {
                    initCube(i * 2, j * 2, k * 2);
                } else initCube(i * 2, j * 2, k * 2);
            }
    cubeGroup.rotateX(Math.PI / 4);
    cubeGroup.rotateY(Math.PI / 4);
}

init();

initCubes();

loop();
