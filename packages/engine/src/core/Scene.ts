import { GameObject } from './GameObject';
import { SceneData } from '../types/index';

export class Scene {
  id: string;
  name: string;
  gameObjects: GameObject[] = [];
  private _isRunning = false;
  private _lastTime = 0;
  private _animationFrameId: number | null = null;

  constructor(id: string, name: string = 'Scene') {
    this.id = id;
    this.name = name;
  }

  addGameObject(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
    if (this._isRunning) {
      gameObject.awake();
      gameObject.start();
    }
  }

  removeGameObject(gameObject: GameObject): void {
    const index = this.gameObjects.indexOf(gameObject);
    if (index > -1) {
      this.gameObjects.splice(index, 1);
      gameObject.destroy();
    }
  }

  findGameObjectById(id: string): GameObject | undefined {
    const search = (objects: GameObject[]): GameObject | undefined => {
      for (const obj of objects) {
        if (obj.id === id) return obj;
        const found = search(obj.children);
        if (found) return found;
      }
      return undefined;
    };
    return search(this.gameObjects);
  }

  awake(): void {
    this.gameObjects.forEach((obj) => obj.awake());
  }

  start(): void {
    this.gameObjects.forEach((obj) => obj.start());
  }

  update(deltaTime: number): void {
    this.gameObjects.forEach((obj) => obj.update(deltaTime));
  }

  play(): void {
    if (this._isRunning) return;
    this._isRunning = true;
    this._lastTime = Date.now();
    this.awake();
    this.start();
    this._loop();
  }

  stop(): void {
    this._isRunning = false;
    if (this._animationFrameId !== null) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = null;
    }
  }

  private _loop = (): void => {
    if (!this._isRunning) return;

    const now = Date.now();
    const deltaTime = (now - this._lastTime) / 1000; // Convert to seconds
    this._lastTime = now;

    this.update(deltaTime);
    this._animationFrameId = requestAnimationFrame(this._loop);
  };

  toData(): SceneData {
    return {
      id: this.id,
      name: this.name,
      gameObjects: this.gameObjects.map((obj) => obj.toData()),
    };
  }
}
