import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Get scenes for a project
router.get('/project/:projectId', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const scenes = await prisma.scene.findMany({
      where: {
        projectId: req.params.projectId,
        userId: req.userId,
      },
      include: {
        gameObjects: {
          include: { components: true, children: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(scenes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scenes' });
  }
});

// Create scene
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const { projectId, name } = req.body;

    const scene = await prisma.scene.create({
      data: {
        name,
        projectId,
        userId: req.userId,
        order: 0,
      },
    });

    res.status(201).json(scene);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create scene' });
  }
});

// Update scene
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const updated = await prisma.scene.update({
      where: { id: req.params.id },
      data: req.body,
      include: { gameObjects: { include: { components: true } } },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update scene' });
  }
});

export default router;
