import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Cube } from 'lucide-react';
import { projectsAPI } from '../../api/endpoints';
import { useProjectStore } from '../../stores/projectStore';

const ModeSelectionPage = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMode, setSelectedMode] = useState<'2D' | '3D'>('2D');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const addProject = useProjectStore((state) => state.addProject);

  const handleCreate = async () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      setLoading(true);
      const response = await projectsAPI.create(projectName, description, selectedMode);
      addProject(response.data);
      navigate(`/project/${response.data.id}/editor`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-slate-400 hover:text-slate-300 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Create New Project
          </h1>
          <p className="text-slate-400">Choose your game engine type and let's get started</p>
        </div>

        {/* Project Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Game"
              className="input-field w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your game about?"
              className="input-field w-full h-24 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Engine Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2D Mode */}
            <div
              onClick={() => setSelectedMode('2D')}
              className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMode === '2D'
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-400" size={32} />
                <div>
                  <h3 className="font-semibold text-lg">2D Mode</h3>
                  <p className="text-slate-400 text-sm">Fast & Optimized</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Perfect for:
              </p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>✓ Platformers</li>
                <li>✓ Top-down adventures</li>
                <li>✓ Puzzle games</li>
                <li>✓ Retro-style games</li>
              </ul>
              <div className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm">
                {selectedMode === '2D' ? '✓ Selected' : 'Select'}
              </div>
            </div>

            {/* 3D Mode */}
            <div
              onClick={() => setSelectedMode('3D')}
              className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMode === '3D'
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Cube className="text-cyan-400" size={32} />
                <div>
                  <h3 className="font-semibold text-lg">3D Mode</h3>
                  <p className="text-slate-400 text-sm">Immersive & Detailed</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Perfect for:
              </p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>✓ 3D adventures</li>
                <li>✓ First-person games</li>
                <li>✓ 3D puzzles</li>
                <li>✓ Exploration games</li>
              </ul>
              <div className="mt-6 inline-block px-4 py-2 bg-purple-600 text-white rounded font-semibold text-sm">
                {selectedMode === '3D' ? '✓ Selected' : 'Select'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading || !projectName.trim()}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
