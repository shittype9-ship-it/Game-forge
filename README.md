# GameForge - Full-Featured Game Engine

A modern, web-based game creation platform that empowers creators to build stunning 2D and 3D games without coding.

## 🎮 Features

- **2D & 3D Support**: Build 2D platformers, top-downs, or 3D worlds
- **Visual Editor**: Intuitive drag-and-drop interface
- **Physics Engine**: Built-in 2D/3D physics with Rapier
- **Animation System**: Keyframe and skeletal animation support
- **Asset Management**: Import sprites, models, audio, fonts
- **Particle Effects**: Create stunning visual effects
- **Audio System**: Background music, sound effects, 3D audio
- **UI System**: Build in-game UI with visual editor
- **Scripting**: TypeScript for game logic
- **Collaboration**: Real-time project collaboration (coming soon)
- **Export**: Deploy to Web, Desktop, Mobile

## 📦 Monorepo Structure

```
gameforge/
├── packages/
│   ├── frontend/     # React editor UI
│   ├── backend/      # Node.js API server
│   └── engine/       # Game engine core
├── docker-compose.yml
├── package.json
└── turbo.json
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## 📋 Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + PostgreSQL + WebSocket
- **Engine**: Babylon.js + Rapier Physics + Custom ECS
- **Database**: PostgreSQL with Supabase
- **Authentication**: JWT + OAuth2

## 📝 License

MIT
