import { create } from 'zustand';

export interface GameObject {
  id: string;
  name: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  data: Record<string, any>;
}

export interface Scene {
  id: string;
  name: string;
  gameObjects: GameObject[];
}

export interface EditorState {
  scenes: Scene[];
  currentScene: Scene | null;
  selectedGameObject: GameObject | null;
  setScenes: (scenes: Scene[]) => void;
  setCurrentScene: (scene: Scene) => void;
  setSelectedGameObject: (object: GameObject | null) => void;
  addGameObject: (object: GameObject) => void;
  updateGameObject: (id: string, data: Partial<GameObject>) => void;
  removeGameObject: (id: string) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  scenes: [],
  currentScene: null,
  selectedGameObject: null,
  isPlaying: false,
  setScenes: (scenes) => set({ scenes }),
  setCurrentScene: (currentScene) => set({ currentScene }),
  setSelectedGameObject: (selectedGameObject) => set({ selectedGameObject }),
  addGameObject: (object) =>
    set((state) => {
      if (!state.currentScene) return state;
      return {
        currentScene: {
          ...state.currentScene,
          gameObjects: [...state.currentScene.gameObjects, object],
        },
      };
    }),
  updateGameObject: (id, data) =>
    set((state) => {
      if (!state.currentScene) return state;
      return {
        currentScene: {
          ...state.currentScene,
          gameObjects: state.currentScene.gameObjects.map((obj) =>
            obj.id === id ? { ...obj, ...data } : obj
          ),
        },
        selectedGameObject:
          state.selectedGameObject?.id === id
            ? { ...state.selectedGameObject, ...data }
            : state.selectedGameObject,
      };
    }),
  removeGameObject: (id) =>
    set((state) => {
      if (!state.currentScene) return state;
      return {
        currentScene: {
          ...state.currentScene,
          gameObjects: state.currentScene.gameObjects.filter(
            (obj) => obj.id !== id
          ),
        },
        selectedGameObject:
          state.selectedGameObject?.id === id ? null : state.selectedGameObject,
      };
    }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
