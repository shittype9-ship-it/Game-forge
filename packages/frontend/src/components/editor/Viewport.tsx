import React from 'react';
import { Scene } from '../../stores/editorStore';
import { Square, Circle, Triangle, Cube } from 'lucide-react';

interface ViewportProps {
  scene: Scene;
  mode: '2D' | '3D';
  isPlaying: boolean;
}

const Viewport: React.FC<ViewportProps> = ({ scene, mode, isPlaying }) => {
  return (
    <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100, 116, 139, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas Area */}
      <canvas
        id="gameCanvas"
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay Info */}
      {isPlaying && (
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
          ● PLAYING
        </div>
      )}

      {/* Center Label */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-slate-500">
            <div className="text-4xl mb-2">
              {mode === '2D' ? '2️⃣' : '3️⃣'}
            </div>
            <p className="text-lg">Ready for {mode}</p>
            <p className="text-sm">Click to select objects</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewport;
