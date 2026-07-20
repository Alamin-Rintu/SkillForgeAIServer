import { Request, Response } from 'express';
import Roadmap from '../models/Roadmap';
import Review from '../models/Review';
import SavedRoadmap from '../models/SavedRoadmap';

export const getRoadmaps = async (req: Request, res: Response) => {
  try {
    const { search, category, difficulty, duration, creatorId, sortBy, page = 1, limit = 9 } = req.query;

    let query: any = {};

    if (creatorId) {
      query.creatorId = creatorId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search as string, $options: 'i' } },
        { shortDescription: { $regex: search as string, $options: 'i' } },
        { skills: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    let sortOptions: any = { createdAt: -1 };
    if (sortBy === 'popular') {
      sortOptions = { ratingCount: -1 };
    } else if (sortBy === 'rating') {
      sortOptions = { rating: -1 };
    } else if (sortBy === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Roadmap.countDocuments(query);
    const roadmaps = await Roadmap.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    return res.json({
      success: true,
      data: roadmaps,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoadmapById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found.' });
    }

    const reviews = await Review.find({ roadmapId: id }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: roadmap,
      reviews
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createRoadmap = async (req: Request, res: Response) => {
  try {
    const { title, shortDescription, fullDescription, difficulty, duration, category, skills, imageUrl, creatorId, creatorName } = req.body;

    if (!title || !shortDescription || !fullDescription || !category) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    const roadmap = await Roadmap.create({
      title,
      shortDescription,
      fullDescription,
      difficulty: difficulty || 'Intermediate',
      duration: duration || '8 Weeks',
      category,
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s: string) => s.trim()),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      ratingCount: 1,
      topics: [
        {
          title: 'Foundations & Principles',
          description: 'Core fundamentals and project environment setup.',
          duration: 'Week 1-2',
          resources: [{ name: 'Documentation Overview', url: '#', type: 'doc' }]
        },
        {
          title: 'Advanced Architecture & Integration',
          description: 'Production best practices, security, and scaling.',
          duration: 'Week 3-6',
          resources: [{ name: 'System Design Patterns', url: '#', type: 'video' }]
        }
      ],
      prerequisites: ['Basic JavaScript / Programming', 'Git & GitHub'],
      creatorId: creatorId || 'demo-user-123',
      creatorName: creatorName || 'Developer'
    });

    return res.status(201).json({ success: true, data: roadmap });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRoadmap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Roadmap.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Roadmap deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleSaveRoadmap = async (req: Request, res: Response) => {
  try {
    const { roadmapId, userId = 'demo-user-123' } = req.body;
    const existing = await SavedRoadmap.findOne({ userId, roadmapId });

    if (existing) {
      await SavedRoadmap.findByIdAndDelete(existing._id);
      return res.json({ success: true, isSaved: false, message: 'Removed from saved roadmaps.' });
    } else {
      await SavedRoadmap.create({ userId, roadmapId });
      return res.json({ success: true, isSaved: true, message: 'Saved to your collection.' });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSavedRoadmaps = async (req: Request, res: Response) => {
  try {
    const { userId = 'demo-user-123' } = req.query;
    const savedItems = await SavedRoadmap.find({ userId: userId as string });
    const roadmapIds = savedItems.map(item => item.roadmapId);
    const roadmaps = await Roadmap.find({ _id: { $in: roadmapIds } });

    return res.json({ success: true, data: roadmaps });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
