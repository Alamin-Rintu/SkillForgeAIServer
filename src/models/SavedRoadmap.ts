import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedRoadmap extends Document {
  userId: string;
  roadmapId: string;
  savedAt: Date;
}

const SavedRoadmapSchema: Schema = new Schema({
  userId: { type: String, required: true },
  roadmapId: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISavedRoadmap>('SavedRoadmap', SavedRoadmapSchema);
