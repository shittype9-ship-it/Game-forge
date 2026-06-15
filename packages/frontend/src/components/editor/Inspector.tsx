import React from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { ChevronDown } from 'lucide-react';

const Inspector = () => {
  const selectedGameObject = useEditorStore((state) => state.selectedGameObject);
  const updateGameObject = useEditorStore((state) => state.updateGameObject);

  if (!selectedGameObject) {
    return (
      <div className="p-4 text-slate-400 text-sm text-center py-10">
        Select an object to view properties
      </div>
    );
  }

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newPosition: [number, number, number] = [...selectedGameObject.position];
    newPosition[axis === 'x' ? 0 : axis === 'y' ? 1 : 2] = value;
    updateGameObject(selectedGameObject.id, { position: newPosition });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-semibold mb-2">Properties</h3>
        <input
          type="text"
          value={selectedGameObject.name}
          onChange={(e) =>
            updateGameObject(selectedGameObject.id, { name: e.target.value })
          }
          className="input-field w-full text-sm"
        />
      </div>

      {/* Transform */}
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <ChevronDown size={16} /> Transform
        </h4>
        <div className="space-y-2 ml-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Position X</label>
            <input
              type="number"
              value={selectedGameObject.position[0]}
              onChange={(e) => handlePositionChange('x', parseFloat(e.target.value))}
              className="input-field w-full text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Position Y</label>
            <input
              type="number"
              value={selectedGameObject.position[1]}
              onChange={(e) => handlePositionChange('y', parseFloat(e.target.value))}
              className="input-field w-full text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Position Z</label>
            <input
              type="number"
              value={selectedGameObject.position[2]}
              onChange={(e) => handlePositionChange('z', parseFloat(e.target.value))}
              className="input-field w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Type */}
      <div>
        <h4 className="font-semibold text-sm mb-2">Type</h4>
        <p className="text-slate-400 text-sm bg-slate-800 p-2 rounded">
          {selectedGameObject.type}
        </p>
      </div>
    </div>
  );
};

export default Inspector;
