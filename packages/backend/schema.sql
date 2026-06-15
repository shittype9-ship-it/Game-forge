-- Create users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar TEXT,
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  "verificationToken" TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  mode VARCHAR(10) DEFAULT '2D',
  thumbnail TEXT,
  published BOOLEAN DEFAULT false,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create scenes table
CREATE TABLE scenes (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  "order" INTEGER DEFAULT 0,
  data JSONB DEFAULT '{}',
  "projectId" TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES users(id),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create gameobjects table
CREATE TABLE game_objects (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  position FLOAT8[] DEFAULT ARRAY[0, 0, 0],
  rotation FLOAT8[] DEFAULT ARRAY[0, 0, 0],
  scale FLOAT8[] DEFAULT ARRAY[1, 1, 1],
  data JSONB DEFAULT '{}',
  "sceneId" TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
  "parentId" TEXT REFERENCES game_objects(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create components table
CREATE TABLE components (
  id TEXT PRIMARY KEY,
  type VARCHAR(100),
  data JSONB DEFAULT '{}',
  enabled BOOLEAN DEFAULT true,
  "gameObjectId" TEXT NOT NULL REFERENCES game_objects(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  url TEXT NOT NULL,
  "mimeType" VARCHAR(100),
  size INTEGER,
  metadata JSONB DEFAULT '{}',
  "projectId" TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES users(id),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create builds table
CREATE TABLE builds (
  id TEXT PRIMARY KEY,
  version INTEGER DEFAULT 1,
  platform VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  url TEXT,
  error TEXT,
  "projectId" TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_projects_user ON projects("userId");
CREATE INDEX idx_scenes_project ON scenes("projectId");
CREATE INDEX idx_gameobjects_scene ON game_objects("sceneId");
CREATE INDEX idx_components_gameobject ON components("gameObjectId");
CREATE INDEX idx_assets_project ON assets("projectId");
CREATE INDEX idx_builds_project ON builds("projectId");
