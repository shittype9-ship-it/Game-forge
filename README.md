# GameForge - Full-Featured Game Engine 🎮

A modern, web-based game creation platform that empowers creators to build stunning 2D and 3D games without coding.

## 🌟 Features

### Core Features
- ✅ **Authentication System** - Sign up, login with JWT
- ✅ **Project Management** - Create, edit, delete projects
- ✅ **2D & 3D Support** - Choose your game mode
- ✅ **Visual Editor** - Drag-and-drop game object editor
- ✅ **Scene Management** - Multiple scenes per project
- ✅ **Hierarchy Panel** - Organize game objects
- ✅ **Inspector Panel** - Edit object properties
- ✅ **Asset Library** - Import and manage assets

### Game Systems (In Progress)
- 🔄 **Physics Engine** - 2D/3D physics with Rapier
- 🎬 **Animation System** - Keyframe and skeletal animation
- 🔊 **Audio System** - Background music, SFX, 3D audio
- ✨ **Particle Effects** - Visual effects
- 🎨 **UI System** - In-game UI builder
- 📝 **Scripting** - TypeScript for game logic
- 🎯 **Prefabs** - Reusable game objects
- 💾 **Save/Load** - Project persistence
- 🚀 **Export** - Build to Web, Desktop, Mobile

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + PostgreSQL + Prisma
- **Engine**: Custom ECS + Babylon.js + Rapier Physics
- **Authentication**: JWT + bcrypt
- **Deployment**: Docker + Docker Compose

### Project Structure
```
gameforge/
├── packages/
│   ├── frontend/          # React editor UI
│   ├── backend/           # Express API server
│   └── engine/            # Game engine core
├── docker-compose.yml     # Docker configuration
├── package.json           # Monorepo root
└── turbo.json             # Turbo build config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### Local Development

1. **Clone and install dependencies**
```bash
git clone https://github.com/shittype9-ship-it/Game-forge.git
cd Game-forge
npm install
```

2. **Setup environment variables**
```bash
cp packages/backend/.env.example packages/backend/.env
# Edit .env with your configuration
```

3. **Start with Docker**
```bash
docker-compose up
```

Or **run locally**:
```bash
# Terminal 1: Backend
cd packages/backend
npm run dev

# Terminal 2: Frontend
cd packages/frontend
npm run dev
```

4. **Access the app**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Database: localhost:5432

## 🎮 User Journey

### 1. Authentication
- **Sign Up**: Create account with email/password
- **Login**: Access your dashboard
- **Profile**: Manage account settings

### 2. Dashboard
- View all your projects
- Create new project
- Delete/manage projects
- See project details (mode, last updated)

### 3. Project Creation
- Enter project name and description
- **Select Mode**: 2D or 3D
- Creates default scene automatically

### 4. Game Editor
- **Viewport**: Visual game preview
- **Hierarchy**: Scene object tree
- **Inspector**: Object properties
- **Toolbar**: Mode-specific tools
- **Asset Library**: Sprites, models, audio, fonts
- **Play/Stop**: Test your game

## 📚 API Documentation

### Authentication
```
POST   /api/auth/signup      - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Projects
```
GET    /api/projects         - List user projects
POST   /api/projects         - Create project
GET    /api/projects/:id     - Get project
PUT    /api/projects/:id     - Update project
DELETE /api/projects/:id     - Delete project
```

### Scenes
```
GET    /api/scenes/project/:projectId  - List scenes
POST   /api/scenes                      - Create scene
PUT    /api/scenes/:id                  - Update scene
```

### Assets
```
GET    /api/assets/project/:projectId   - List assets
POST   /api/assets                      - Upload asset
DELETE /api/assets/:id                  - Delete asset
```

## 🔧 Development

### Backend
```bash
cd packages/backend

# Development
npm run dev

# Build
npm run build

# Database migrations
npm run migrate
```

### Frontend
```bash
cd packages/frontend

# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

### Engine
```bash
cd packages/engine

# Build
npm run build

# Watch mode
npm run dev
```

## 📦 Database Schema

### Users
- id, email, username, password, avatar, bio, verified

### Projects
- id, name, description, mode (2D/3D), thumbnail, userId

### Scenes
- id, name, order, data (JSON), projectId

### GameObjects
- id, name, type, position, rotation, scale, sceneId

### Components
- id, type, data (JSON), gameObjectId

### Assets
- id, name, type, url, projectId

### Builds
- id, version, platform, status, projectId

## 🚀 Deployment

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Cloud Deployment (Recommended)
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: Supabase, Heroku PostgreSQL, Railway

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Authentication system
- [x] Project management
- [x] Editor UI layout
- [ ] 2D rendering system
- [ ] 3D rendering system

### Phase 2
- [ ] Physics engine (2D/3D)
- [ ] Animation system
- [ ] Audio system
- [ ] Particle effects
- [ ] Prefab system

### Phase 3
- [ ] UI system
- [ ] Scripting engine
- [ ] Save/Load system
- [ ] Build system
- [ ] Export to Web/Desktop/Mobile

### Phase 4
- [ ] Real-time collaboration
- [ ] Asset marketplace
- [ ] Template library
- [ ] Community features
- [ ] Advanced analytics

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## 💬 Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/shittype9-ship-it/Game-forge/issues)
- Email: support@gameforge.local

## 🙏 Acknowledgments

- Babylon.js for 3D rendering
- Rapier for physics engine
- React for UI framework
- Prisma for database ORM
- Tailwind CSS for styling

---

**Built with ❤️ by the GameForge Team**
