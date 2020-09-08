var camera, scene, renderer, mountainGroup, shapeGroup, chunkArray;

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function randomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

/*
 * Inclusive random.
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initSpace() {
  var material = new THREE.LineBasicMaterial({ color: 'rgb(251, 59, 228)' });
  mountainGroup = new THREE.Group();

  mountainGroup.update = () => {
    chunkArray.forEach((chunk) => {
      chunk.position.z += 0.05;
      if (chunk.position.z > camera.position.z) {
        chunk.position.z = 0;
      }
    });
  };

  mountainGroup.loadChunk = (start, end) => {
    var chunk = new THREE.Group();
    var leftSpan = -10;
    var rightSpan = 10;
    var zStart = 0;
    var zEnd = end - start;

    var randArray = [];
    for (var x = leftSpan; x < rightSpan; x++) {
      var temp = [];
      for (var z = zStart; z <= zEnd; z++) {
        var slope = 0;
        temp.push(Math.random() * 10 * slope + 8 * slope);
      }
      randArray.push(temp);
    }

    for (var x = leftSpan; x < rightSpan; x++) {
      var points = [];
      for (var z = zStart; z <= zEnd; z++) {
        points.push(
          new THREE.Vector3(x, randArray[x - leftSpan][z - zStart], z)
        );
      }
      var line = new THREE.Line(
        new THREE.Geometry().setFromPoints(points),
        material
      );
      line.position.setZ(zStart);
      chunk.add(line);
    }

    for (var z = zStart; z <= zEnd; z++) {
      var points = [];
      for (var x = leftSpan; x < rightSpan; x++) {
        points.push(
          new THREE.Vector3(x, randArray[x - leftSpan][z - zStart], z)
        );
        var line = new THREE.Line(
          new THREE.Geometry().setFromPoints(points),
          material
        );
        line.position.setZ(zStart);
        chunk.add(line);
      }
    }
    scene.add(chunk);
    chunk.position.z = end;
    chunkArray.push(chunk);
  };

  mountainGroup.loadChunk(0, 5);
  mountainGroup.loadChunk(5, 10);
  mountainGroup.loadChunk(10, 15);
  mountainGroup.loadChunk(15, 20);
  mountainGroup.loadChunk(20, 25);
  mountainGroup.loadChunk(25, 30);
  mountainGroup.loadChunk(30, 35);
  mountainGroup.loadChunk(35, 40);
  mountainGroup.loadChunk(40, 45);
  mountainGroup.loadChunk(45, 50);
  scene.add(mountainGroup);
}

function initShapes() {
  shapeGroup = new THREE.Group();
  shapeGroup.update = () => {
    shapeGroup.children.forEach((shape) => {
      shape.position.z += 0.05;
      if (shape.position.z > 55) {
        // shape.geometry.dispose();
        // shape.material.dispose();
        // scene.remove(shape);
        // shapeGroup.create();
        shape.position.z = 0;
      }
    });
  };
  shapeGroup.create = () => {
    var material = new THREE.MeshBasicMaterial({ color: randomColor() });
    var mesh;
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        var geometry = new THREE.SphereGeometry(1, 32, 32);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case 1:
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case 2:
        var geometry = new THREE.ConeGeometry(1, 1, 32);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case 3:
        var geometry = new THREE.CylinderGeometry(1, 2, 2, 2);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case 4:
        var geometry = new THREE.RingGeometry(1, 5, 10);
        mesh = new THREE.Mesh(geometry, material);

        break;
      default:
        break;
    }
    mesh.position.set(random(-10, 10), random(-10, 10), random(0, 50));
    mesh.rotateX(random(0, 10));
    mesh.rotateY(random(0, 10));
    mesh.rotateZ(random(0, 10));
    shapeGroup.add(mesh);
  };
  for (var i = 0; i < 100; i++) shapeGroup.create();
  scene.add(shapeGroup);
}

function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    40
  );
  camera.position.z = 50;
  camera.position.y = 2;

  scene = new THREE.Scene();
  chunkArray = [];
  var light = new THREE.PointLight(0xffffff, 3, 100, 2);
  light.position.set(0, 25, 25); //50
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: false }); //TODO for slow clients turn antialias off
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function loop() {
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
  mountainGroup.update();
  shapeGroup.update();
}

init();
initShapes();
initSpace();

loop();
