import { GameObjectData } from '../types/index';
import { Transform } from './Transform';

export interface ComponentInterface {
  enabled: boolean;
  awake(): void;
  start(): void;
  update(deltaTime: number): void;
  onDestroy(): void;
}

export class Component implements ComponentInterface {
  enabled = true;
  protected gameObject: GameObject | null = null;

  awake(): void {}
  start(): void {}
  update(deltaTime: number): void {}
  onDestroy(): void {}
}

export class GameObject {
  id: string;
  name: string;
  type: string;
  transform: Transform;
  components: Map<string, Component> = new Map();
  children: GameObject[] = [];
  parent: GameObject | null = null;
  active = true;
  private _started = false;

  constructor(id: string, name: string, type: string = 'GameObject') {
    this.id = id;
    this.name = name;
    this.type = type;
    this.transform = new Transform();
  }

  addComponent<T extends Component>(ComponentClass: new () => T): T {
    const component = new ComponentClass();
    (component as any).gameObject = this;
    this.components.set(ComponentClass.name, component);
    component.awake();
    return component;
  }

  getComponent<T extends Component>(ComponentClass: new () => T): T | undefined {
    return this.components.get(ComponentClass.name) as T | undefined;
  }

  removeComponent<T extends Component>(ComponentClass: new () => T): void {
    const component = this.components.get(ComponentClass.name);
    if (component) {
      component.onDestroy();
      this.components.delete(ComponentClass.name);
    }
  }

  addChild(child: GameObject): void {
    if (child.parent) {
      const index = child.parent.children.indexOf(child);
      if (index > -1) {
        child.parent.children.splice(index, 1);
      }
    }
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: GameObject): void {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  awake(): void {
    this.components.forEach((component) => {
      if (component.enabled) {
        component.awake();
      }
    });
    this.children.forEach((child) => child.awake());
  }

  start(): void {
    if (this._started) return;
    this._started = true;

    this.components.forEach((component) => {
      if (component.enabled) {
        component.start();
      }
    });
    this.children.forEach((child) => child.start());
  }

  update(deltaTime: number): void {
    if (!this.active) return;

    this.components.forEach((component) => {
      if (component.enabled) {
        component.update(deltaTime);
      }
    });
    this.children.forEach((child) => child.update(deltaTime));
  }

  destroy(): void {
    this.components.forEach((component) => {
      component.onDestroy();
    });
    this.children.forEach((child) => child.destroy());
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  toData(): GameObjectData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      transform: this.transform as any,
      components: Array.from(this.components.values()).map((c) => ({
        type: c.constructor.name,
        enabled: c.enabled,
        data: {},
      })),
      children: this.children.map((c) => c.toData()),
    };
  }
}
