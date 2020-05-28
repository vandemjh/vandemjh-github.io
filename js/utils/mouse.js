var mouse = new THREE.Vector2();
mouse.x = undefined;
mouse.y = undefined;

document.addEventListener(
    "mousemove",
    () => {
        // event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        if (typeof mousemove === "function") mousemove();
    },
    false
);
document.addEventListener(
    "click",
    () => {
    	// event.preventDefault();
        if (typeof click === "function") click();
    },
    false
);
