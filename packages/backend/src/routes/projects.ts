import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

// Get all projects for user
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const projects = await prisma.project.findMany({
      where: { userId: req.userId },
      include: { scenes: true },
      orderBy: { updatedAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create project
router.post(
  '/',
  [
    body('name').trim().notEmpty().isLength({ max: 255 }),
    body('mode').isIn(['2D', '3D']),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

      const { name, description, mode } = req.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          mode,
          userId: req.userId,
          scenes: {
            create: {
              name: 'Main Scene',
              userId: req.userId,
            },
          },
        },
        include: { scenes: true },
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// Get single project
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        scenes: { include: { gameObjects: { include: { components: true } } } },
        assets: true,
      },
    });

    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Update project
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
