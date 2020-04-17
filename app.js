var camera, scene, renderer;
var geometry, material;
var cubeGroup = new THREE.Group();
var lightGroup = new THREE.Group();

// const boxDimensions = 0.2;
const boxDimensions = 2;

var dark = new THREE.Color(0x1c1c1c);
var grey = new THREE.Color(0x808080);
var light = new THREE.Color(0xececec);

window.onresize = function () {
    // location.reload();
    camera.aspect = window.innerWidth / window.innerHeight;
    				camera.updateProjectionMatrix();
    
    				renderer.setSize( window.innerWidth, window.innerHeight );
};

document.addEventListener("mousedown", onMouseDown, false);

function onMouseDown(e) {
    var vectorMouse = new THREE.Vector3( //vector from camera to mouse
        (-(window.innerWidth / 2 - e.clientX) * 2) / window.innerWidth,
        ((window.innerHeight / 2 - e.clientY) * 2) / window.innerHeight,
        -1 / Math.tan((camera.fov * Math.PI) / 180)
    );
    // console.log(vectorMouse)
    vectorMouse.applyQuaternion(camera.quaternion);
    vectorMouse.normalize();
    // console.log(vectorMouse)

    var vectorObject = new THREE.Vector3(); //vector from camera to cubeGroup
    vectorObject.set(
        cubeGroup.position.x - camera.position.x,
        cubeGroup.position.y - camera.position.y,
        cubeGroup.position.z - camera.position.z
    );
    vectorObject.normalize();
    if ((vectorMouse.angleTo(vectorObject) * 180) / Math.PI < 1) {
        console.log("clicked");
    }
}

function init() {
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );
    camera.position.z = 20;

    lightSource = new THREE.PointLight(0xffffff, 1, 10, 2);
    lightSource.position.set(0, 1, 8);
    lightSource1 = new THREE.PointLight(0xffffff, 1, 10, 2);
    lightSource1.position.set(0, -1, 8);
    lightSource2 = new THREE.PointLight(0xffffff, 1, 10, 2);
    lightSource2.position.set(-1, 0, 8);
    lightSource3 = new THREE.PointLight(0xffffff, 1, 10, 2);
    lightSource3.position.set(1, 0, 8);

    scene = new THREE.Scene();
    lightGroup.add(lightSource);
    lightGroup.add(lightSource1);
    lightGroup.add(lightSource2);
    lightGroup.add(lightSource3);

    scene.add(cubeGroup);
    scene.add(lightGroup);

    renderer = new THREE.WebGLRenderer(); //{ antialias: true }
    renderer.setSize(window.innerWidth, window.innerHeight);

    // console.log(canvas.devicePixelRatio);

    document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
    var geometry = new THREE.BoxGeometry(
        boxDimensions,
        boxDimensions,
        boxDimensions
    );

    toPush = new THREE.Mesh(
        geometry,
        new THREE.MeshToonMaterial()
        // new THREE.MeshBasicMaterial()
    );
    // toPush.geometry.colorsNeedUpdate = true;
    toPush.position.x = x;
    toPush.position.y = y;
    toPush.position.z = z;

    // console.log(toPush.getWorldPosition())
    // console.log(camera.getWorldPosition())
    // toPush.center(0,0,0)

    toPush.rotateX(Math.PI / 4);
    toPush.rotateY(Math.PI / 4);

    cubeGroup.add(toPush);
}

function loop() {
    requestAnimationFrame(loop);

    cubeGroup.rotation.z += 0.002;

    cubeGroup.needsUpdate = true;
    lightGroup.needsUpdate = true;

    renderer.render(scene, camera);
}

init();

function placeCubes(offsetX, offsetY) {
    initCube(offsetX + 0, offsetY + 0, 0);
    var snug = 0.1;
    var horiChange = boxDimensions / 4 + snug;
    var vertChange = boxDimensions / 4 - snug;
    initCube(
        offsetX + boxDimensions - horiChange,
        offsetY + boxDimensions + vertChange,
        0
    );
    initCube(
        offsetX + -boxDimensions + horiChange,
        offsetY + boxDimensions + vertChange,
        0
    );
    initCube(
        offsetX + boxDimensions - horiChange,
        offsetY + -boxDimensions - vertChange,
        0
    );
    initCube(
        offsetX + -boxDimensions + horiChange,
        offsetY + -boxDimensions - vertChange,
        0
    );
    initCube(
        offsetX + boxDimensions + horiChange + 0.221,
        offsetY + boxDimensions - vertChange - 1.61,
        0
    );
    initCube(
        offsetX + -boxDimensions - vertChange - 0.421,
        offsetY + -boxDimensions + horiChange + 1.41,
        0
    );
}

placeCubes(0, 0);
placeCubes(5.631, 4.8);
placeCubes(-5.631, 4.8);
placeCubes(-5.631, -4.8);
placeCubes(5.631, -4.8);
placeCubes(5.631, -4.8);
placeCubes(8.45, 0);
placeCubes(-8.45, 0);
placeCubes(0, -4.8);
placeCubes(0, 4.8);

loop();
