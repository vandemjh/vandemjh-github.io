import * as Colors from './utils/colors.js';
import { camera, scene, initUtil, loopUtil } from './utils/init.js';
import './utils/onresize.js';
import { random, randomDecimals } from './utils/utils.js';

var graph;

function loop() {
  requestAnimationFrame(loop);
  graph.update();
  loopUtil();
}

function init() {
  initUtil();
  camera.position.set(0, 0, 5);
}

function initGraph() {
  graph = new THREE.Object3D();
  const node = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 10, 10),
    new THREE.MeshBasicMaterial({
      color: Colors.LIMEGREEN,
      side: THREE.DoubleSide,
    })
  );
  var points = [];
  for (let i = 0; i < 10; i++) {
    var clone = node.clone();
    clone.position.set(
      randomDecimals(-1, 1),
      randomDecimals(-1, 1),
      randomDecimals(-1, 1)
    );
    graph.add(clone);
  }
  graph.getRandomChild = () => {
    return graph.children[random(0, graph.children.length - 1)];
  };

  graph.children.forEach(() => {
    graph.children.forEach((child) => {
      var child = graph.getRandomChild();
      points.push(
        new THREE.Vector3(child.position.x, child.position.y, child.position.z)
      );
    });
  });
  const edge = new THREE.Line(
    new THREE.Geometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: Colors.LIMEGREEN })
  );
  graph.add(edge);

  graph.update = () => {
    graph.rotation.x += 0.004;
    graph.rotation.y += 0.004;
    graph.rotation.z += 0.004;
  };

  scene.add(graph);
}

init();
initGraph();
loop();
