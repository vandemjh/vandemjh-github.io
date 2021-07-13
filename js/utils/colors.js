/**
 * Initializes commonly used colors
 **/

export const LIMEGREEN = 0x20c20e;
export function randomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
