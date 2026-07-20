import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface IAIChat extends Document {
  userId: string;
  topic: string;
  messages: IChatMessage[];
  createdAt: Date;
}

const AIChatSchema: Schema = new Schema({
  userId: { type: String, required: true },
  topic: { type: String, default: 'General Career Practice' },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAIChat>('AIChat', AIChatSchema);
