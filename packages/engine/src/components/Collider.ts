import { Component } from '../core/GameObject';

export interface ColliderShape {
  type: 'box' | 'sphere' | 'capsule' | 'cylinder';
  size?: { width: number; height: number; depth: number };
  radius?: number;
}

export class Collider extends Component {
  shape: ColliderShape;
  isTrigger: boolean = false;
  material: { friction: number; restitution: number } = {
    friction: 0.5,
    restitution: 0.3,
  };

  constructor(shape: ColliderShape = { type: 'box', size: { width: 1, height: 1, depth: 1 } }) {
    super();
    this.shape = shape;
  }

  awake(): void {
    // Initialize collider
  }

  setShape(shape: ColliderShape): void {
    this.shape = shape;
  }

  setTrigger(isTrigger: boolean): void {
    this.isTrigger = isTrigger;
  }
}
