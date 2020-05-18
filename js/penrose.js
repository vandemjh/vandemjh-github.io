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
    light = new THREE.PointLight(0xffffff, 3, 200, 2);
    light.position.set(0, 50, 50); //50
    scene.add(light);
    light = new THREE.PointLight(0xffffff, 3, 80, 2);
    light.position.set(0, -50, 50); //50
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

/*
 * Creates rectangular prism at 0,0,0
 */
function rectangularPrism(width, height, depth) {
    var x = (y = z = 0);
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
    var one = rectangularPrism(4, 20, 2);
    var two = rectangularPrism(4, 20, 2);
    var three = new THREE.Group();
    var material = new THREE.MeshStandardMaterial({
        color: "blue",
        side: THREE.FrontSide,
    });
    material.flatShading = true;
    three.add(
        new THREE.Mesh(
            new THREE.CylinderGeometry(2.9 / Math.sqrt(2), 4 / Math.sqrt(2), 12, 4, 1, true),
            material
        )
    );
    // var three = rectangularPrism(4, 20, 2,);

    two.rotateZ(Math.PI / 2);
    two.position.set(8, -8, 0);
    one.add(two);

    three.rotateX(Math.PI / 2);
    three.rotateY(Math.PI / 4);
    three.position.set(0, 8, 8);
    console.log(three);
    one.add(three);

    // one.rotateY(Math.PI / 6);
    one.rotateX(Math.PI / 4);
    one.rotateZ(-Math.PI / 4);
    // one.rotateX(Math.PI / 10);
    // one.position.set(-8, 0, 0);
    triangle.add(one);
    triangle.rotateZ(Math.PI / 6);
    triangle.position.set(-4, -4, 0);

    // var one = rectangularPrism(4, 20, 2, 10, 0, 0);
    // rotate(one, new THREE.Vector3(0, 0, 0), Math.PI);
    // for (rect of one) triangle.add(rect);
}

function loop() {
    // triangle.rotation.y += 0.02;

    // console.log(triangle.rotation.y)
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

init();
loop();
initTriangle();
