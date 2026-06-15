import { Scene } from './Scene';

export class Engine {
  private scenes: Map<string, Scene> = new Map();
  private currentScene: Scene | null = null;
  private width: number;
  private height: number;
  private targetFPS: number;

  constructor(width: number = 1920, height: number = 1080, targetFPS: number = 60) {
    this.width = width;
    this.height = height;
    this.targetFPS = targetFPS;
  }

  createScene(id: string, name: string): Scene {
    const scene = new Scene(id, name);
    this.scenes.set(id, scene);
    return scene;
  }

  getScene(id: string): Scene | undefined {
    return this.scenes.get(id);
  }

  setCurrentScene(scene: Scene): void {
    if (this.currentScene) {
      this.currentScene.stop();
    }
    this.currentScene = scene;
  }

  getCurrentScene(): Scene | null {
    return this.currentScene;
  }

  play(): void {
    if (this.currentScene) {
      this.currentScene.play();
    }
  }

  stop(): void {
    if (this.currentScene) {
      this.currentScene.stop();
    }
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getTargetFPS(): number {
    return this.targetFPS;
  }
}
