var camera, scene, renderer, sun, lineGroup, mountainGroup;
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing.html

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

function visibleHeightAtZDepth(depth) {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = (camera.fov * Math.PI) / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

function visibleWidthAtZDepth(depth) {
    const height = visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
}

function initSun(x, y, z) {
    lineGroup = new THREE.Group();
    //SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer)
    var geometry = new THREE.SphereGeometry(5, 20, 20);

    var topColor = new THREE.Color(252, 130, 5);
    var bottomColor = new THREE.Color(251, 59, 228);
    var material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
    });
    sun = new THREE.Mesh(geometry, material);
    sun.position.x = x;
    sun.position.y = y;
    sun.position.z = z;

    var redDiff =
        (bottomColor.r - topColor.r) / (sun.geometry.faces.length * 3);
    var greenDiff =
        (bottomColor.g - topColor.g) / (sun.geometry.faces.length * 3);
    var blueDiff =
        (bottomColor.b - topColor.b) / (sun.geometry.faces.length * 3);
    material.needsUpdate = true; //likely uneeded

    var count = 0;
    sun.geometry.faces.forEach((face) => {
        for (var i = 0; i < 3; i++) {
            face.vertexColors[i] = new THREE.Color(
                (topColor.r + redDiff * ++count) / 255,
                (topColor.g + greenDiff * count) / 255,
                (topColor.b + blueDiff * count) / 255
            );
        }
    });
    scene.add(sun);
    var radius = sun.geometry.parameters.radius;
    var sunTop = new THREE.Vector3(
        sun.position.x + radius,
        sun.position.y + radius,
        sun.position.z + radius
    );
    var sunBot = new THREE.Vector3(
        sun.position.x - radius,
        sun.position.y - radius,
        sun.position.z + radius
    );
    sun.top = sunTop;
    sun.bot = sunBot;

    // console.log(sunTop, sunBot)
    for (let i = sunBot.y; i < sunTop.y; i++) {
        var line = new THREE.Line(
            new THREE.Geometry().setFromPoints([
                new THREE.Vector3(sunTop.x, 0, sunTop.z),
                new THREE.Vector3(sunBot.x, 0, sunBot.z),
            ]),
            new THREE.LineBasicMaterial({
                color: "black",
            })
        );
        line.position.y = i;
        lineGroup.add(line);
    }

    lineGroup.update = () => {
        lineGroup.children.forEach((line) => {
            var radius = sun.geometry.parameters.radius;
            // var factor = radius / (line.position.y)
            // var relativePosition = new THREE.Vector3().copy(line.position);
            // line.localToWorld(relativePosition);
            // sun.worldToLocal(relativePosition);
            line.position.y -= 0.01; // * factor;
            line.material.linewidth += 0.01;
            var viewingAngle = 0.5; //Change this due to the lines being closer to the camera than the sun
            if (line.position.y < sun.bot.y - viewingAngle) {
                line.position.y = sun.top.y - viewingAngle;
                line.material.linewidth = 0.00001;
            }
        });
    };
    scene.add(lineGroup);
}

function initMountains() {
    var material = new THREE.LineBasicMaterial({ color: "rgb(251, 59, 228)" });
    mountainGroup = new THREE.Group();
    var line = new THREE.Line(
        new THREE.Geometry().setFromPoints([
            new THREE.Vector3(visibleWidthAtZDepth(0), 0, 0),
            new THREE.Vector3(-visibleWidthAtZDepth(0), 0, 0),
        ]),
        material
    );
    // scene.add(line);
    var min = -camera.position.z;
    var max = camera.position.z;

    var randArray = [];
    for (var x = min; x < max; x++) {
        var temp = [];
        for (var z = 0; z < max; z++) {
            temp.push(Math.random());
        }
        randArray.push(temp);
    }
    // console.log(randArray);

    for (var x = min; x < max; x++) {
        var points = [];
        for (var z = 0; z < max; z++) {
            // points.push(new THREE.Vector3(x, 0, z));
            points.push(new THREE.Vector3(x, randArray[x-min][z], z));
        }
        mountainGroup.add(
            new THREE.Line(new THREE.Geometry().setFromPoints(points), material)
        );
        points = [];
    }

    for (var z = 0; z < max; z++) {
        var points = [];
        for (var x = min; x < max; x++) {
            points.push(new THREE.Vector3(x, randArray[x-min][z], z));
            mountainGroup.add(
                new THREE.Line(
                    new THREE.Geometry().setFromPoints(points),
                    material
                )
            );
        }
    }

    // var count = 0;
    // var x = 0;
    // var y = 0;
    // var heights = []
    // for (line of mountainGroup.children) {
    // var temp = [];
    // for (vert of line.geometry.vertices) {
    // temp.push(new THREE.Vector3(x++, vert.y, z++));
    // }
    // heights.push(temp);
    // }
    // console.log(heights);

    console.log(mountainGroup);
    mountainGroup.update = () => {
        mountainGroup.children.forEach((line) => {
            // if (line.horizontal) {
            line.position.z += 0.02;
            if (line.position.z > camera.position.z) {
                line.position.z = 0;
                // console.log(line)
            }
            if (line.verticle) {
            }
        });
    };
    scene.add(mountainGroup);
}

function init() {
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );
    camera.position.z = 50;
    camera.position.y = 2;
    scene = new THREE.Scene();
    cubeGroup = new THREE.Group();
    outterCube = new THREE.Group();
    scene.add(cubeGroup);

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    lineGroup.update();
    mountainGroup.update();
    // sun.position.z = camera.position.z + 50;
    // camera.position.z -= 0.2
}

init();

initSun(0, 5, -5);
initMountains();

loop();
