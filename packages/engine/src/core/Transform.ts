import { Vector3 } from '../types/index';

export class Transform {
  position: Vector3 = { x: 0, y: 0, z: 0 };
  rotation: Vector3 = { x: 0, y: 0, z: 0 };
  scale: Vector3 = { x: 1, y: 1, z: 1 };

  constructor(position?: Vector3, rotation?: Vector3, scale?: Vector3) {
    if (position) this.position = position;
    if (rotation) this.rotation = rotation;
    if (scale) this.scale = scale;
  }

  toArray(): number[] {
    return [
      this.position.x,
      this.position.y,
      this.position.z,
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      this.scale.x,
      this.scale.y,
      this.scale.z,
    ];
  }
}
