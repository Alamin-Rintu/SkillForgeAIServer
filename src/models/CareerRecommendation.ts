import mongoose, { Schema, Document } from 'mongoose';

export interface ICareerRecommendation extends Document {
  userId: string;
  targetJob: string;
  recommendedJobs: { title: string; matchScore: number; reason: string }[];
  recommendedCourses: { title: string; provider: string; url: string }[];
  recommendedProjects: { title: string; description: string; techStack: string[] }[];
  recommendedCertificates: { title: string; issuer: string }[];
  createdAt: Date;
}

const CareerRecommendationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  targetJob: { type: String, required: true },
  recommendedJobs: [
    { title: String, matchScore: Number, reason: String }
  ],
  recommendedCourses: [
    { title: String, provider: String, url: String }
  ],
  recommendedProjects: [
    { title: String, description: String, techStack: [String] }
  ],
  recommendedCertificates: [
    { title: String, issuer: String }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICareerRecommendation>('CareerRecommendation', CareerRecommendationSchema);
