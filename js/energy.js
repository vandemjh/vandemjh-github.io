import * as Colors from './utils/colors.js';
import { camera, scene, initUtil, loopUtil } from './utils/init.js';
const cameraDepth = 50;

function init() {
  initUtil();
  camera.position.set(0, 0, cameraDepth);
  camera.lookAt(0, 0, 0);
}
init();
import { random, visibleYAtZ, visibleXAtZ } from './utils/utils.js';
import { mouse } from './utils/mouse.js';
import './utils/onresize.js';

const speed = 0.3;
const sphereSegments = 4;
const switchDirectionsMultiple = 2;
const volts = [];
const sceneX = visibleXAtZ(camera);
const sceneY = visibleYAtZ(camera);
const sceneZ = cameraDepth;

function loop() {
  requestAnimationFrame(loop);
  volts.forEach((volt) => volt.update());
  loopUtil();
}

const createVolt = (x, y) => {
  const volt = new THREE.Group();
  var previousVolt = undefined;
  var material = new THREE.MeshBasicMaterial({
    color: Colors.randomColor(),
    side: THREE.FrontSide,
  });
  for (let i = 1; i < 25; i++) {
    var newVolt = new THREE.Mesh(
      new THREE.SphereGeometry(i / 100, sphereSegments, sphereSegments),
      material
    );
    newVolt.position.x = x;
    newVolt.position.y = y;
    if (previousVolt) previousVolt.following = newVolt;
    previousVolt = newVolt;
    volt.add(newVolt);
  }
  var leader = previousVolt;
  volt.leader = leader;
  volt.children.forEach(
    (c) => (c.update = () => c.position.copy(c.following.position))
  );
  volt.chooseDirection = () => {
    let d = random(1, 3);
    let oldDirection = volt.direction;
    volt.direction = d == 1 ? 'x' : d == 2 ? 'y' : 'z';
    if (volt.direction === oldDirection)
      volt.direction = d == 1 ? 'x' : d == 2 ? 'y' : 'z';
  };
  volt.chooseSpeed = () => {
    volt.speed = speed * (Math.random() > 0.5 ? -1 : 1);
  };

  leader.switchDirectionsLock = 0;

  leader.update = () => {
    if (volt.direction === 'x') {
      if (
        Math.round(leader.position.x) !=
          Math.round(leader.switchDirectionsLock) &&
        Math.abs(leader.position.x - leader.previousDirectionChange) >=
          switchDirectionsMultiple
      ) {
        volt.setPreviousDirectionChange();
        volt.chooseDirection();
        volt.chooseSpeed();

        leader.switchDirectionsLock = leader.position.x;
      } else leader.position.x += volt.speed;
    } else if (volt.direction === 'y') {
      if (
        Math.round(leader.position.y) !=
          Math.round(leader.switchDirectionsLock) &&
        Math.abs(leader.position.y - leader.previousDirectionChange) >=
          switchDirectionsMultiple
      ) {
        volt.setPreviousDirectionChange();
        volt.chooseDirection();
        volt.chooseSpeed();

        leader.switchDirectionsLock = leader.position.y;
      } else leader.position.y += volt.speed;
    } else if (volt.direction === 'z') {
      if (
        Math.round(leader.position.z) !=
          Math.round(leader.switchDirectionsLock) &&
        Math.abs(leader.position.z - leader.previousDirectionChange) >=
          switchDirectionsMultiple
      ) {
        volt.setPreviousDirectionChange();
        volt.chooseDirection();
        volt.chooseSpeed();

        leader.switchDirectionsLock = leader.position.z;
      } else leader.position.z += volt.speed;
    }
    leader.switchDirectionsLock++;
  };

  volt.chooseDirection();
  volt.chooseSpeed();

  volt.setPreviousDirectionChange = () =>
    (leader.previousDirectionChange =
      volt.direction === 'x'
        ? leader.position.x
        : volt.direction === 'y'
        ? leader.position.y
        : leader.position.z);
  volt.setPreviousDirectionChange();
  volt.update = () => {
    if (
      volt.leader.position.x > sceneX ||
      volt.leader.position.y > sceneY ||
      volt.leader.position.z > sceneZ
    )
      scene.remove(volt);

    volt.children.forEach((c) => c.update());
  };
  scene.add(volt);
  return volt;
};

mouse.click = () => {
  for (let i = 0; i < 5; i++) volts.push(createVolt(0, 0));
};

loop();
