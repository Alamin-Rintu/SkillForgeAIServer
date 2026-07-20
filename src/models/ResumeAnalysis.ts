import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeAnalysis extends Document {
  userId: string;
  resumeText: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  atsCompatibility: number;
  suggestedImprovements: string[];
  createdAt: Date;
}

const ResumeAnalysisSchema: Schema = new Schema({
  userId: { type: String, required: true },
  resumeText: { type: String, required: true },
  score: { type: Number, required: true },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  missingSkills: [{ type: String }],
  atsCompatibility: { type: Number, required: true },
  suggestedImprovements: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResumeAnalysis>('ResumeAnalysis', ResumeAnalysisSchema);
