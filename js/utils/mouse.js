/**
 * Adds a mouse variable and two event listeners,
 * one for mouse movements and one for clicks
 * which call mousemove() and click() functions
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
    if (typeof mousemove === 'function') mousemove();
    else
      console.log(
        'This is Jack, create a mousemove() function to trigger when the mouse is moved'
      );
  },
  false
);
document.addEventListener(
  'click',
  () => {
    // event.preventDefault();
    if (typeof click === 'function') click();
    else
      console.log(
        'This is Jack, create a click() function to trigger when clicked'
      );
  },
  false
);
