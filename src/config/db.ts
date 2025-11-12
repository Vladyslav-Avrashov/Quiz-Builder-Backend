import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongodbConnection = async (): Promise<void> => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');
    const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(connectionString);

    console.log('MongoDB: Connection established successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB Connection Error:', error.message);
    } else {
      console.error('Unknown MongoDB Connection Error:', error);
    }
    process.exit(1);
  }
};
