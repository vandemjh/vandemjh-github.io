import {LIMEGREEN} from "./utils/colors.js";
import { camera, scene, renderer, initUtil, loopUtil } from "./utils/init.js";
import "./utils/onresize.js";
import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from '../node_modules/three/examples/jsm/postprocessing/GlitchPass.js';

var globe, composer, glitchPass;

function loop() {
    requestAnimationFrame(loop);
    // globe.rotation.z += 0.002;
    globe.update();
    composer.render();
    // loopUtil();
}

function init() {
    initUtil();
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    glitchPass = new GlitchPass();
    // glitchPass.goWild = true;
    composer.addPass(glitchPass);
    camera.position.set(0, 0, 5);
}

function initGlobe() {
    globe = new THREE.Object3D();
    var ring = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.008, 30, 30),
        new THREE.MeshBasicMaterial({
            color: LIMEGREEN,
            side: THREE.DoubleSide,
        })
    );
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 8) {
        let newRing = ring.clone();
        newRing.rotation.x += i;
        globe.add(newRing);
    }
    globe.latitude = [];
    for (let i = -1; i <= 1; i += (1 / 3)) {
        let newRing = ring.clone();
        newRing.rotation.y += Math.PI / 2
        newRing.position.x = i;
        globe.add(newRing)
        globe.latitude.push(newRing)
    }
    globe.update = () => {
        globe.rotation.x += 0.002;
        globe.latitude.forEach((line) => {
            if (line.position.x > 0)
                line.scale.set(
                    Math.sqrt(-1 * (line.position.x - 1)),
                    Math.sqrt(-1 * (line.position.x - 1)),
                    1);
            if (line.position.x < 0)
                line.scale.set(
                    Math.sqrt(line.position.x + 1),
                    Math.sqrt(line.position.x + 1),
                    1);
            line.position.x -= 0.002;
            if (line.position.x < -1) {
                line.position.x = 1;
            }
        })
    }
    scene.add(globe);
}

init();
initGlobe();
globe.rotation.y += 0.2;
globe.rotation.z += 0.5;
loop();
