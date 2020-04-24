var camera, scene, renderer;
var geometry, material;
var cubeGroup = new THREE.Group();
var lightGroup = new THREE.Group();

const boxDimensions = 2;
// var boxDimensions = 2;

var counter = 0;

var dark = new THREE.Color(0x1c1c1c);
var grey = new THREE.Color(0x808080);
var light = new THREE.Color(0xececec);

function distance(v1, v2) {
    var dx = v1.position.x - v2.position.x;
    var dy = v1.position.y - v2.position.y;
    var dz = v1.position.z - v2.position.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};

function init() {
    camera = new THREE.PerspectiveCamera(
        10,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );
    camera.position.z = 80;

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

    document.body.appendChild(renderer.domElement);
}

function initCube(x, y, z) {
	// Prevents overlapping cubes
    if (cubeGroup.children.some( (cube) => distance(cube, { position: { 'x': x, 'y': y, 'z': z } }) < boxDimensions)) return;
    var geometry = new THREE.BoxGeometry(
        boxDimensions,
        boxDimensions,
        boxDimensions
    );

    toPush = new THREE.Mesh(geometry, new THREE.MeshToonMaterial());
    toPush.position.x = x;
    toPush.position.y = y;
    toPush.position.z = z;
    toPush.rotateX(Math.PI / 4);
    toPush.rotateY(Math.PI / 4);

    cubeGroup.add(toPush);
}

function random(min, max) {
    return Math.round(Math.random() * max + min);
}

function loop() {
    requestAnimationFrame(loop);

    cubeGroup.rotation.z += 0.002;

    cubeGroup.needsUpdate = true;
    lightGroup.needsUpdate = true;

    if (counter >= 10) {
        counter = 0;
        // console.log(cu.beGroup.children[random(0, cubeGroup.children.length - 1)])
        xcube = cubeGroup.children[
            random(0, cubeGroup.children.length - 1)
        ]
        xcube.reverseX = xcube.reverseX == true ? false : true;
                ycube = cubeGroup.children[
            random(0, cubeGroup.children.length - 1)
        ]
        ycube.reverseY = ycube.reverseY == true ? false : true;
                zcube = cubeGroup.children[
            random(0, cubeGroup.children.length - 1)
        ]
        zcube.reverseZ = zcube.reverseZ == true ? false : true;
    }

    cubeGroup.children.forEach((cube) => {
        if (cube.reverseX) {
            cube.rotation.x -= 0.003;
        }
        if (cube.reverseY) {
            cube.rotation.y -= 0.003;
        }
                if (cube.reverseZ) {
            cube.rotation.z -= 0.003;
        }
    });

    renderer.render(scene, camera);

    counter += 0.1;
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
