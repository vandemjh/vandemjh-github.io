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
