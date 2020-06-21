var globe;

function loop() {
    requestAnimationFrame(loop);
    globe.rotation.z += 0.002;
    globe.rotation.y += 0.003;
    loopUtil();
}

function init() {
    initUtil();
    camera.position.set(0, 0, 5);
}

function initGlobe() {
    var ring = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.008, 30, 30),
        new THREE.MeshBasicMaterial({
            color: LIMEGREEN,
            side: THREE.DoubleSide,
        })
    );
    globe = new THREE.Object3D();
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 8) {
        var newRing = ring.clone();
        newRing.rotation.x += i;
        globe.add(newRing);
    }    
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 6) {
        var newRing = ring.clone();
        newRing.rotation.y += i;
        globe.add(newRing);
    }
    // globe.
    scene.add(globe);
}

init();
initGlobe();
loop();
