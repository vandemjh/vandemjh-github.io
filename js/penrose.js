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
    light = new THREE.PointLight(0xffffff, 3, 250, 2);
    light.position.set(0, 50, 50); //50
    scene.add(light);
    light = new THREE.PointLight(0xffffff, 3, 90, 2);
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
            flatShading: true,
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
            flatShading: true,
        })
    );
    five.rotateX(Math.PI / 2);
    five.position.set(x, y + height / 2, z);
    var six = new THREE.Mesh(
        new THREE.PlaneGeometry(depth * 2, depth * 2),
        new THREE.MeshLambertMaterial({
            color: "blue",
            side: THREE.DoubleSide,
            flatShading: true,
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
    // var one = rectangularPrism(4, 20, 2);
    var one = new THREE.Group();
    one.add(
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                3.4 / Math.sqrt(2),
                4 / Math.sqrt(2),
                16,
                4,
                1,
                false,
                Math.PI / 4
            ),
            new THREE.MeshStandardMaterial({
                color: "blue",
                side: THREE.DoubleSide,
                flatShading: true,
            })
        )
    );
    one.children[0].position.y += 2.0;
    
    // var two = rectangularPrism(4, 20, 2);
    var two = new THREE.Group();
    two.add(
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                4 / Math.sqrt(2),
                4 / Math.sqrt(2),
                20,
                4,
                1,
                false,
                Math.PI / 4
            ),
            new THREE.MeshStandardMaterial({
                color: "blue",
                flatShading: true,
            })
        )
    );

    var three = new THREE.Group();
    three.add(
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                2.5 / Math.sqrt(2),
                3.4 / Math.sqrt(2),
                12,
                4,
                1,
                true
            ),
            new THREE.MeshStandardMaterial({
                color: "blue",
                side: THREE.FrontSide,
                flatShading: true,
            })
        )
    );
    three.children[0].position.z += -0.465;
    three.children[0].position.y += -0.1;
    three.children[0].position.x += 0.19;
   	three.children[0].geometry.vertices[3].y += -2.5;
   	// three.children[0].geometry.vertices[3].z += -;
   	
    // var three = rectangularPrism(4, 20, 2,);

    /* --- One transforms --- */
    // one.position.z += 2;
    one.rotateX(Math.PI / 4);
    one.rotateZ(-Math.PI / 4);

    /* --- Two transforms --- */
    two.rotateZ(Math.PI / 2);
    two.position.set(8, -8, 0);
    one.add(two);

    /* --- Three transforms --- */
    three.rotateX(Math.PI / 2);
    three.rotateY(Math.PI / 4);
    three.position.set(0, 8, 8);
    one.add(three);

    triangle.add(one);
    triangle.rotateZ(Math.PI / 6);
    triangle.rotation.y += -0.025;
    triangle.rotation.z += -0.04;
    triangle.position.set(-4, -4, 0);

    // var one = rectangularPrism(4, 20, 2, 10, 0, 0);
    // rotate(one, new THREE.Vector3(0, 0, 0), Math.PI);
    // for (rect of one) triangle.add(rect);
}

function loop() {
    // triangle.rotation.y += 0.002;

    // console.log(triangle.rotation.y)
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

init();
loop();
initTriangle();
