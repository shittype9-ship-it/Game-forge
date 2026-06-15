import { Component } from '../core/GameObject';

export interface AnimationFrame {
  time: number;
  properties: Record<string, any>;
}

export class Animator extends Component {
  animations: Map<string, AnimationFrame[]> = new Map();
  currentAnimation: string | null = null;
  currentTime: number = 0;
  isPlaying: boolean = false;
  loop: boolean = true;
  speed: number = 1;

  addAnimation(name: string, frames: AnimationFrame[]): void {
    this.animations.set(name, frames);
  }

  play(name: string, loop: boolean = true): void {
    if (this.animations.has(name)) {
      this.currentAnimation = name;
      this.isPlaying = true;
      this.currentTime = 0;
      this.loop = loop;
    }
  }

  stop(): void {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  pause(): void {
    this.isPlaying = false;
  }

  resume(): void {
    this.isPlaying = true;
  }

  update(deltaTime: number): void {
    if (!this.isPlaying || !this.currentAnimation || !this.gameObject) return;

    const frames = this.animations.get(this.currentAnimation);
    if (!frames) return;

    this.currentTime += deltaTime * this.speed;

    const lastFrame = frames[frames.length - 1];
    if (this.currentTime > lastFrame.time) {
      if (this.loop) {
        this.currentTime = this.currentTime % lastFrame.time;
      } else {
        this.isPlaying = false;
        return;
      }
    }

    // Find current frame and interpolate
    for (let i = 0; i < frames.length - 1; i++) {
      const frame = frames[i];
      const nextFrame = frames[i + 1];

      if (this.currentTime >= frame.time && this.currentTime < nextFrame.time) {
        const t = (this.currentTime - frame.time) / (nextFrame.time - frame.time);
        this.interpolateFrame(frame, nextFrame, t);
        break;
      }
    }
  }

  private interpolateFrame(
    frame1: AnimationFrame,
    frame2: AnimationFrame,
    t: number
  ): void {
    // Apply interpolated properties to gameObject
    if (!this.gameObject) return;

    Object.keys(frame1.properties).forEach((key) => {
      const val1 = frame1.properties[key];
      const val2 = frame2.properties[key];

      if (typeof val1 === 'number' && typeof val2 === 'number') {
        const interpolated = val1 + (val2 - val1) * t;
        // Apply to gameObject
      }
    });
  }
}
