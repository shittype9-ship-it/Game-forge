import { Component } from '../core/GameObject';

export class Rigidbody extends Component {
  mass: number = 1;
  velocity: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  angularVelocity: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  drag: number = 0.1;
  angularDrag: number = 0.05;
  useGravity: boolean = true;
  isKinematic: boolean = false;
  constraints: number = 0;

  awake(): void {
    // Initialize rigidbody
  }

  update(deltaTime: number): void {
    if (this.isKinematic || !this.gameObject) return;

    // Apply gravity
    if (this.useGravity) {
      this.velocity.y -= 9.81 * deltaTime;
    }

    // Apply drag
    this.velocity.x *= 1 - this.drag * deltaTime;
    this.velocity.y *= 1 - this.drag * deltaTime;
    this.velocity.z *= 1 - this.drag * deltaTime;

    // Update position
    this.gameObject.transform.position.x += this.velocity.x * deltaTime;
    this.gameObject.transform.position.y += this.velocity.y * deltaTime;
    this.gameObject.transform.position.z += this.velocity.z * deltaTime;
  }

  addForce(
    x: number,
    y: number,
    z: number,
    forceMode: 'Force' | 'Impulse' = 'Force'
  ): void {
    if (forceMode === 'Force') {
      this.velocity.x += x / this.mass;
      this.velocity.y += y / this.mass;
      this.velocity.z += z / this.mass;
    } else {
      this.velocity.x += x;
      this.velocity.y += y;
      this.velocity.z += z;
    }
  }

  setVelocity(x: number, y: number, z: number): void {
    this.velocity = { x, y, z };
  }
}
