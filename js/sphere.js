const requires = [
	"onresize"
]

window.onload = () => {
	requires.forEach(file => {
		
	var script = document.createElement("script");
    script.src = "js/utils/" + file + ".js";
    document.getElementsByTagName("footer")[0].appendChild(script);
    console.log("asdf")
	})
}

var camera, scene, renderer;

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

    renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO for slow clients turn antialias off
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

init();
loop();
