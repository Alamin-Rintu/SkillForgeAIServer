import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb+srv://SkillFrogeAI:A4wv9IzNaK6w5B0y@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || DEFAULT_URI;
    const conn = await mongoose.connect(connStr);
    console.log(`[database]: MongoDB connected successfully to ${conn.connection.host}`);
  } catch (error) {
    console.warn('[database]: MongoDB Atlas connection warning:', error);
  }
};
