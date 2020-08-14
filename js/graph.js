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
  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.02, 0.02),
    new THREE.MeshBasicMaterial({
      color: Colors.LIMEGREEN,
      side: THREE.DoubleSide,
    })
  );
  for (let i = 0; i < 2; i++) {
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

  var clone = edge.clone();
  let child1 = graph.children[0];
  let child2 = graph.children[1];
  console.log(child1.position.distanceTo(child2.position));
  clone.position.set(child1.position.x, child1.position.y, child1.position.z);
  clone.geometry.scale(child1.position.distanceTo(child2.position), 1, 1);
  // clone.geometry.scale(child.position.distanceTo(child2));
  // clone.position.set(child.position.x, child.position.y, child.position.z);
  var lookAt = new THREE.Vector3(
    child2.position.x * -1,
    child2.position.y,
    child2.position.z
  );
  // lookAt.x = lookAt.x * -1;
  // lookAt.y = lookAt.y * -1;
  // lookAt.z = lookAt.z * -1;
  clone.lookAt(lookAt);

  graph.add(clone);

  // graph.children.forEach((child) => {
  //   var clone = edge.clone();
  //   let randomChild = graph.getRandomChild();
  //   console.log(child.position.distanceTo(randomChild.position));
  //   clone.geometry.scale(
  //     child.position.distanceTo(randomChild.position)
  //   )
  //   // clone.position.set(child.position.x, child.position.y, child.position.z);
  //   // clone.lookAt(0, 0, 0);

  //   graph.add(clone);
  // });

  graph.update = () => {
    graph.rotation.x += 0.04;
    // graph.rotation.z += 0.004;
  };

  scene.add(graph);
}

init();
initGraph();
loop();
