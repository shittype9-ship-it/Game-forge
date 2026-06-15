import React from 'react';
import { Scene } from '../../stores/editorStore';
import { useEditorStore } from '../../stores/editorStore';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

interface HierarchyProps {
  scene: Scene;
}

const Hierarchy: React.FC<HierarchyProps> = ({ scene }) => {
  const selectedGameObject = useEditorStore((state) => state.selectedGameObject);
  const setSelectedGameObject = useEditorStore((state) => state.setSelectedGameObject);
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">{scene.name}</h3>
          <button className="hover:bg-slate-700 p-1 rounded">
            <Plus size={16} />
          </button>
        </div>

        {/* Game Objects Tree */}
        <div className="space-y-1">
          {scene.gameObjects && scene.gameObjects.length > 0 ? (
            scene.gameObjects.map((obj) => (
              <div key={obj.id} className="text-sm">
                <div
                  onClick={() => setSelectedGameObject(obj)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                    selectedGameObject?.id === obj.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  {obj.children && obj.children.length > 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(obj.id);
                      }}
                      className="p-0"
                    >
                      {expanded.has(obj.id) ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </button>
                  ) : (
                    <div className="w-4" />
                  )}
                  <span>{obj.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-slate-400 text-sm px-2 py-4 text-center">
              No objects in scene
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hierarchy;
