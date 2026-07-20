"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoNative = exports.mongoClient = void 0;
exports.disconnectFromMongoDB = disconnectFromMongoDB;
const mongodb_1 = require("mongodb");
const DEFAULT_URI = 'mongodb+srv://SkillFrogeAI:A4wv9IzNaK6w5B0y@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0';
const uri = process.env.MONGODB_URI || DEFAULT_URI;
exports.mongoClient = new mongodb_1.MongoClient(uri);
const connectMongoNative = async () => {
    try {
        await exports.mongoClient.connect();
        console.log('[database]: Native MongoClient connected to MongoDB Atlas for Better Auth');
        return exports.mongoClient.db();
    }
    catch (err) {
        console.warn('[database]: MongoClient native connection warning:', err);
        return null;
    }
};
exports.connectMongoNative = connectMongoNative;
async function disconnectFromMongoDB() {
    await exports.mongoClient.close();
}
