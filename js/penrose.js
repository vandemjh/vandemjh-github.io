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
    light = new THREE.PointLight(0xffffff, 3, 200, 2);
    light.position.set(0, 50, 40); //50
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function rectangularPrism(width, height, depth, x, y, z) {
    var toReturn = new THREE.Group();
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
    var five = new THREE.Mesh(
        new THREE.PlaneGeometry(depth * 2, depth * 2),
        new THREE.MeshLambertMaterial({
            color: "blue",
            side: THREE.DoubleSide,
        })
    );
    five.rotateX(Math.PI / 2);
    five.position.set(x, y + height / 2, z);
    var six = new THREE.Mesh(
        new THREE.PlaneGeometry(depth * 2, depth * 2),
        new THREE.MeshLambertMaterial({
            color: "blue",
            side: THREE.DoubleSide,
        })
    );
    six.rotateX(Math.PI / 2);
    six.position.set(x, y - height / 2, z);

    toReturn.add(one);
    toReturn.add(two);
    toReturn.add(three);
    toReturn.add(four);
    toReturn.add(five);
    toReturn.add(six);

    return toReturn;
}

function initTriangle() {
    // Half of depth!
    var one = rectangularPrism(4, 20, 2, 0, 0, 0);
    // one.rotateY(Math.PI / 4);
    // one.rotateX(Math.PI / 4);
    one.position.set(-5, -2, 0);
    one.rotateZ(-Math.PI / 6);
    triangle.add(one);

    var two = rectangularPrism(4, 20, 2, 10, 0, 0);
    two.rotateY(Math.PI / 4);
    two.rotateX(-Math.PI / 4);
    triangle.add(two);

    var three = rectangularPrism(4, 20, 2, 0, 0, 0);
    // three.rotateY(Math.PI / 4);
    // three.rotateX(Math.PI / 4);
    three.rotateZ(Math.PI / 2);
    three.position.set(-2, -10, -0);
    triangle.add(three);

    // var one = rectangularPrism(4, 20, 2, 10, 0, 0);
    // rotate(one, new THREE.Vector3(0, 0, 0), Math.PI);
    // for (rect of one) triangle.add(rect);
}

function loop() {
    // triangle.rotation.y += 0.001;
    // triangle.position.x += 0.002;
    triangle.needsUpdate = true;
    // console.log(triangle.rotation.y)
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

init();
loop();
initTriangle();
