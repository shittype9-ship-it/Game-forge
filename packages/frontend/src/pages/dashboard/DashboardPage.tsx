import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, MoreVertical, Lock, Globe } from 'lucide-react';
import { projectsAPI } from '../../api/endpoints';
import { useProjectStore } from '../../stores/projectStore';
import { useAuthStore } from '../../stores/authStore';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GameForge
            </h1>
            <p className="text-slate-400 text-sm">Welcome, {user?.username}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Your Projects</h2>
            <p className="text-slate-400 mt-2">{projects.length} projects</p>
          </div>
          <button
            onClick={() => navigate('/project/new')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 mb-4">No projects yet</p>
            <button
              onClick={() => navigate('/project/new')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create your first project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-600 transition-all group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-full h-40 bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative group-hover:from-blue-800/50 group-hover:to-purple-800/50 transition-colors flex items-center justify-center">
                  <div className="text-4xl opacity-20">{project.mode === '2D' ? '2D' : '3D'}</div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                    {project.description || 'No description'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">
                        {project.mode === '2D' ? '2️⃣' : '3️⃣'} {project.mode}
                      </span>
                      {project.published && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">
                          <Globe size={12} /> Published
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/project/${project.id}/editor`)}
                        className="p-2 hover:bg-slate-700 rounded transition-colors"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 hover:bg-red-900/50 text-red-400 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-700 text-xs text-slate-400">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
