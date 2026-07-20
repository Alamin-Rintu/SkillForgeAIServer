"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogBySlug = exports.getBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const getBlogs = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        const blogs = await Blog_1.default.find(query).sort({ createdAt: -1 });
        return res.json({ success: true, data: blogs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBlogs = getBlogs;
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog_1.default.findOne({ slug });
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog article not found.' });
        }
        return res.json({ success: true, data: blog });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBlogBySlug = getBlogBySlug;
