import mongoose from 'mongoose';
import keys from '../config/keys';

export async function connectDB() {

  mongoose.connect(await keys.mongoURI, { });

  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Connected to MongoDB...');
  });
}
