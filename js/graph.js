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
    new THREE.SphereGeometry(0.025, 10, 10),
    new THREE.MeshBasicMaterial({
      color: Colors.LIMEGREEN,
      side: THREE.DoubleSide,
    })
  );
  var points = [];
  for (let i = 0; i < 12; i++) {
    var clone = node.clone();
    clone.position.set(
      randomDecimals(-2, 2),
      randomDecimals(-2, 2),
      randomDecimals(-2, 2)
    );
    graph.add(clone);
  }
  graph.getRandomChild = () => {
    return graph.children[random(0, graph.children.length - 1)];
  };

  for (let i = 0; i < 5; i++)
    graph.children.forEach((_child) => {
      points.push(graph.getRandomChild().position);
    });
  var edge = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: Colors.LIMEGREEN })
  );
  graph.add(edge);

  var counter = 1;
  points.forEach((child) => {
    child.xAdder = Math.random() / 1000;
    child.yAdder = Math.random() / 1000;
    child.zAdder = Math.random() / 1000;
  });

  graph.update = () => {
    // if (counter % 500 == 0) {
    //   points = []
    //   for (let i = 0; i < 5; i++)
    //   graph.children.forEach((_child) => {
    //     points.push(graph.getRandomChild().position);
    //   });
    // }
    edge.geometry.setFromPoints(points);
    points.forEach((child) => {
      child.x += child.xAdder;
      child.y += child.yAdder;
      child.z += child.zAdder;
      if (child.x >= 1.5 || child.x <= -1.5) child.xAdder *= -1;
      if (child.y >= 1.5 || child.y <= -1.5) child.yAdder *= -1;
      if (child.z >= 1.5 || child.z <= -1.5) child.zAdder *= -1;
    });

    counter++;
  };

  scene.add(graph);
}

init();
initGraph();
loop();
