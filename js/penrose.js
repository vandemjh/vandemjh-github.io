var camera, scene, renderer, triangle;
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
    triangle = new THREE.Object3D();
    scene.add(triangle);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function rectangularPrism(width, height, depth, x, y, z) {
    var toReturn = [];
    var geomesh = [
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
            color: "blue",
            side: THREE.DoubleSide,
        }),
    ];
    toReturn.push(
        new THREE.Mesh(...geomesh)
    );

    return toReturn;
}

function initTriangle() {
    for (rect of rectangularPrism(1, 30, 1, 1, 1, 1)) {
        triangle.add(rect);
    }
}

function loop() {
    triangle.rotation.y += 0.002;
    // triangle.position.x += 0.002;
    triangle.needsUpdate = true;
    // console.log(triangle.rotation.y)
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

init();
loop();
initTriangle();

console.log(triangle);
