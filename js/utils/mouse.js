/**
 * Adds a mouse variable and two event listeners,
 * one for mouse movements and one for clicks
 * which call mouse.mousemove() and mouse.click() functions
 * respectivly if they have been defined.
 **/
export var mouse = new THREE.Vector2();
mouse.x = undefined;
mouse.y = undefined;

document.addEventListener(
  'mousemove',
  () => {
    // event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (typeof mouse.mousemove === 'function') mouse.mousemove();
  },
  false
);
document.addEventListener(
  'click',
  () => {
    // event.preventDefault();
    if (typeof mouse.click === 'function') mouse.click();
  },
  false
);
