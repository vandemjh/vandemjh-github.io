var camera, scene, renderer, triangle, light;
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
    light = new THREE.PointLight(0xffffff, 3, 100, 2);
    light.position.set(0, 0, 50);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function rectangularPrism(width, height, depth, x, y, z) {
    var toReturn = [];
    var geomesh = [
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshLambertMaterial({
            color: "blue",
            side: THREE.DoubleSide,
        }),
    ];
    var one = new THREE.Mesh(...geomesh);
    one.position.set(x, y, z - depth);
    var two = new THREE.Mesh(...geomesh);
    two.position.set(x, y, z + depth);
    var three = new THREE.Mesh(...geomesh);
    three.position.set(x - depth, y, z);
    three.rotation.y = Math.PI / 2;
    var four = new THREE.Mesh(...geomesh);
    four.position.set(x + depth, y, z);
    four.rotation.y = Math.PI / 2;

    toReturn.push(one);
    toReturn.push(two);
    toReturn.push(three);
    toReturn.push(four);

    return toReturn;
}

// function rotate(arr, worldVector, rot) {
    // for (i of arr) {
        // var x = i.position.x;
        // var y = i.position.y;
        // var z = i.position.z;
// 
        // i.position.set(0);
        // i.rotateOnWorldAxis(worldVector, rot);
        // i.position.set(x, y, z);
    // }
// }

function initTriangle() {
    for (rect of rectangularPrism(4, 20, 2, 0, 0, 0)) triangle.add(rect);
    for (rect of rectangularPrism(4, 20, 2, 1, 1, 0)) triangle.add(rect);
}

function loop() {
    triangle.rotation.y += 0.008;
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
