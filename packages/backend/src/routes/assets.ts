import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Get assets for a project
router.get('/project/:projectId', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const assets = await prisma.asset.findMany({
      where: {
        projectId: req.params.projectId,
        userId: req.userId,
      },
    });

    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// Create asset
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const { name, type, url, mimeType, size, projectId, metadata } = req.body;

    const asset = await prisma.asset.create({
      data: {
        name,
        type,
        url,
        mimeType,
        size,
        projectId,
        userId: req.userId,
        metadata,
      },
    });

    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

// Delete asset
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    await prisma.asset.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

export default router;
