export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomDecimals(min, max) {
  return random(min, max) + Math.random() > 0.5
    ? -1 * Math.random()
    : Math.random();
}

export function distance(a, b) {
  return Math.hypot(a, b);
}

export function visibleYAtZ(camera, depth) {
  if (!depth) depth = camera.position.z
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

export function visibleXAtZ(camera, depth) {
  return depth
    ? visibleYAtZ(camera, depth) * camera.aspect
    : visibleYAtZ(camera, camera.position.z) * camera.aspect;
}
