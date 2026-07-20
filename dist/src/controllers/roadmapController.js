"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedRoadmaps = exports.toggleSaveRoadmap = exports.deleteRoadmap = exports.createRoadmap = exports.getRoadmapById = exports.getRoadmaps = void 0;
const Roadmap_1 = __importDefault(require("../models/Roadmap"));
const Review_1 = __importDefault(require("../models/Review"));
const SavedRoadmap_1 = __importDefault(require("../models/SavedRoadmap"));
const getRoadmaps = async (req, res) => {
    try {
        const { search, category, difficulty, duration, sortBy, page = 1, limit = 9 } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { shortDescription: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        if (category && category !== 'All') {
            query.category = category;
        }
        if (difficulty && difficulty !== 'All') {
            query.difficulty = difficulty;
        }
        let sortOptions = { createdAt: -1 };
        if (sortBy === 'popular') {
            sortOptions = { ratingCount: -1 };
        }
        else if (sortBy === 'rating') {
            sortOptions = { rating: -1 };
        }
        else if (sortBy === 'newest') {
            sortOptions = { createdAt: -1 };
        }
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const total = await Roadmap_1.default.countDocuments(query);
        const roadmaps = await Roadmap_1.default.find(query).sort(sortOptions).skip(skip).limit(limitNum);
        return res.json({
            success: true,
            data: roadmaps,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum) || 1
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getRoadmaps = getRoadmaps;
const getRoadmapById = async (req, res) => {
    try {
        const { id } = req.params;
        const roadmap = await Roadmap_1.default.findById(id);
        if (!roadmap) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }
        const reviews = await Review_1.default.find({ roadmapId: id }).sort({ createdAt: -1 });
        return res.json({
            success: true,
            data: roadmap,
            reviews
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getRoadmapById = getRoadmapById;
const createRoadmap = async (req, res) => {
    try {
        const { title, shortDescription, fullDescription, difficulty, duration, category, skills, imageUrl } = req.body;
        if (!title || !shortDescription || !fullDescription || !category) {
            return res.status(400).json({ success: false, message: 'Required fields missing.' });
        }
        const roadmap = await Roadmap_1.default.create({
            title,
            shortDescription,
            fullDescription,
            difficulty: difficulty || 'Intermediate',
            duration: duration || '8 Weeks',
            category,
            skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s) => s.trim()),
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
            prerequisites: ['Basic JavaScript / Programming', 'Git & GitHub']
        });
        return res.status(201).json({ success: true, data: roadmap });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.createRoadmap = createRoadmap;
const deleteRoadmap = async (req, res) => {
    try {
        const { id } = req.params;
        await Roadmap_1.default.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Roadmap deleted successfully.' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteRoadmap = deleteRoadmap;
const toggleSaveRoadmap = async (req, res) => {
    try {
        const { roadmapId, userId = 'demo-user-123' } = req.body;
        const existing = await SavedRoadmap_1.default.findOne({ userId, roadmapId });
        if (existing) {
            await SavedRoadmap_1.default.findByIdAndDelete(existing._id);
            return res.json({ success: true, isSaved: false, message: 'Removed from saved roadmaps.' });
        }
        else {
            await SavedRoadmap_1.default.create({ userId, roadmapId });
            return res.json({ success: true, isSaved: true, message: 'Saved to your collection.' });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.toggleSaveRoadmap = toggleSaveRoadmap;
const getSavedRoadmaps = async (req, res) => {
    try {
        const { userId = 'demo-user-123' } = req.query;
        const savedItems = await SavedRoadmap_1.default.find({ userId: userId });
        const roadmapIds = savedItems.map(item => item.roadmapId);
        const roadmaps = await Roadmap_1.default.find({ _id: { $in: roadmapIds } });
        return res.json({ success: true, data: roadmaps });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSavedRoadmaps = getSavedRoadmaps;
