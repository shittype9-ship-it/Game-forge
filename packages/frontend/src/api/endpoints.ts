import api from './client';

export const authAPI = {
  signup: (email: string, username: string, password: string) =>
    api.post('/auth/signup', { email, username, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  create: (name: string, description: string, mode: '2D' | '3D') =>
    api.post('/projects', { name, description, mode }),
  getOne: (id: string) => api.get(`/projects/${id}`),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const scenesAPI = {
  getByProject: (projectId: string) =>
    api.get(`/scenes/project/${projectId}`),
  create: (projectId: string, name: string) =>
    api.post('/scenes', { projectId, name }),
  update: (id: string, data: any) => api.put(`/scenes/${id}`, data),
};

export const assetsAPI = {
  getByProject: (projectId: string) =>
    api.get(`/assets/project/${projectId}`),
  create: (data: any) => api.post('/assets', data),
  delete: (id: string) => api.delete(`/assets/${id}`),
};
