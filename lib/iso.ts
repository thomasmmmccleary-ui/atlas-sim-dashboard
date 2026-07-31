export const TILE = 84; // px, one grid unit in world space
export const ROOM_HEIGHT = 190; // px, wall height in world space
export const ROTATE_X = 58; // deg, camera tilt
export const ROTATE_Z = 45; // deg, camera turn

export function worldPos(gx: number, gy: number, gz = 0): string {
  return `translate3d(${gx * TILE}px, ${gy * TILE}px, ${gz}px)`;
}
