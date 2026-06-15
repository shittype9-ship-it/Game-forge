import React from 'react';
import { Square, Circle, Cube, Sphere, Plus } from 'lucide-react';

interface ToolbarProps {
  mode: '2D' | '3D';
}

const Toolbar: React.FC<ToolbarProps> = ({ mode }) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2">
      <button
        className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200"
        title="Select Tool (V)"
      >
        ➡️
      </button>
      <button
        className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200"
        title="Move Tool (W)"
      >
        ✦
      </button>
      <button
        className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200"
        title="Rotate Tool (E)"
      >
        ⟲
      </button>
      <button
        className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200"
        title="Scale Tool (R)"
      >
        ↔️
      </button>

      <div className="w-px h-6 bg-slate-700 mx-2" />

      {mode === '2D' ? (
        <>
          <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200" title="Add Sprite">
            <Square size={18} />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200" title="Add Circle">
            <Circle size={18} />
          </button>
        </>
      ) : (
        <>
          <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200" title="Add Cube">
            <Cube size={18} />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200" title="Add Sphere">
            <Sphere size={18} />
          </button>
        </>
      )}

      <button className="ml-auto p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200">
        <Plus size={18} />
      </button>
    </div>
  );
};

export default Toolbar;
