export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Transform {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
}

export interface ComponentData {
  type: string;
  enabled: boolean;
  data: Record<string, any>;
}

export interface GameObjectData {
  id: string;
  name: string;
  type: string;
  transform: Transform;
  components: ComponentData[];
  children: GameObjectData[];
}

export interface SceneData {
  id: string;
  name: string;
  gameObjects: GameObjectData[];
}
