import mongoose, { Schema, Document } from 'mongoose';

export interface IRoadmapTopic {
  title: string;
  description: string;
  duration: string;
  resources: { name: string; url: string; type: 'doc' | 'video' | 'course' }[];
}

export interface IRoadmap extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  skills: string[];
  imageUrl: string;
  rating: number;
  ratingCount: number;
  topics: IRoadmapTopic[];
  prerequisites: string[];
  creatorId?: string;
  creatorName?: string;
  createdAt: Date;
}

const RoadmapSchema: Schema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  skills: [{ type: String }],
  imageUrl: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  ratingCount: { type: Number, default: 120 },
  topics: [
    {
      title: { type: String },
      description: { type: String },
      duration: { type: String },
      resources: [
        {
          name: { type: String },
          url: { type: String },
          type: { type: String, enum: ['doc', 'video', 'course'] }
        }
      ]
    }
  ],
  prerequisites: [{ type: String }],
  creatorId: { type: String, default: 'admin' },
  creatorName: { type: String, default: 'SkillForge AI Team' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
