import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Save, Download, Settings } from 'lucide-react';
import { projectsAPI, scenesAPI } from '../../api/endpoints';
import { useEditorStore } from '../../stores/editorStore';
import { useProjectStore } from '../../stores/projectStore';
import Viewport from '../../components/editor/Viewport';
import Hierarchy from '../../components/editor/Hierarchy';
import Inspector from '../../components/editor/Inspector';
import Toolbar from '../../components/editor/Toolbar';
import AssetLibrary from '../../components/editor/AssetLibrary';

const EditorPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentProject = useProjectStore((state) => state.currentProject);
  const setCurrentProject = useProjectStore((state) => state.setCurrentProject);

  const isPlaying = useEditorStore((state) => state.isPlaying);
  const setIsPlaying = useEditorStore((state) => state.setIsPlaying);
  const scenes = useEditorStore((state) => state.scenes);
  const currentScene = useEditorStore((state) => state.currentScene);
  const setScenes = useEditorStore((state) => state.setScenes);
  const setCurrentScene = useEditorStore((state) => state.setCurrentScene);

  useEffect(() => {
    if (!projectId) return;
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const projectResponse = await projectsAPI.getOne(projectId!);
      setCurrentProject(projectResponse.data);

      const scenesResponse = await scenesAPI.getByProject(projectId!);
      setScenes(scenesResponse.data);
      if (scenesResponse.data.length > 0) {
        setCurrentScene(scenesResponse.data[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load project');
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading editor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentProject || !currentScene) {
    return (
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Project not found</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-slate-400 hover:text-slate-300"
          >
            ←
          </button>
          <div>
            <h1 className="font-semibold">{currentProject.name}</h1>
            <p className="text-xs text-slate-400">
              {currentProject.mode} • {currentScene?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded flex items-center gap-2 ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'btn-secondary'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={16} /> Stop
              </>
            ) : (
              <>
                <Play size={16} /> Play
              </>
            )}
          </button>
          <button className="btn-secondary p-2">
            <RotateCcw size={16} />
          </button>
          <button className="btn-secondary p-2">
            <Save size={16} />
          </button>
          <button className="btn-secondary p-2">
            <Download size={16} />
          </button>
          <button className="btn-secondary p-2">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Hierarchy & Assets */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button className="flex-1 px-4 py-2 bg-slate-800 border-b-2 border-blue-500 text-sm font-medium">
              Hierarchy
            </button>
            <button className="flex-1 px-4 py-2 text-slate-400 hover:bg-slate-800/50 text-sm font-medium">
              Assets
            </button>
          </div>

          {/* Hierarchy */}
          <Hierarchy scene={currentScene} />
        </div>

        {/* Center - Viewport */}
        <div className="flex-1 flex flex-col bg-slate-900">
          <Toolbar mode={currentProject.mode} />
          <Viewport scene={currentScene} mode={currentProject.mode} isPlaying={isPlaying} />
        </div>

        {/* Right Panel - Inspector & Properties */}
        <div className="w-80 bg-slate-900 border-l border-slate-800 overflow-y-auto">
          <Inspector />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
