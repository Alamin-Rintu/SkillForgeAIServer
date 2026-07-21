import { MongoClient } from 'mongodb';

const DEFAULT_URI = 'mongodb+srv://SkillFrogeAI:A4wv9IzNaK6w5B0y@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0';
const uri = process.env.MONGODB_URI || DEFAULT_URI;

export const mongoClient = new MongoClient(uri);

let isNativeConnected = false;

export const connectMongoNative = async () => {
  if (isNativeConnected) {
    return mongoClient.db();
  }
  try {
    await mongoClient.connect();
    isNativeConnected = true;
    console.log('[database]: Native MongoClient connected to MongoDB Atlas for Better Auth');
    return mongoClient.db();
  } catch (err) {
    console.warn('[database]: MongoClient native connection warning:', err);
    return null;
  }
};

export async function disconnectFromMongoDB() {
  await mongoClient.close();
  isNativeConnected = false;
}
