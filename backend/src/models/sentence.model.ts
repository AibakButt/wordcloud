import mongoose, { Document, Schema } from 'mongoose';

export interface SentenceDocument extends Document {
  sentence: string;
}

const sentenceSchema = new Schema({
  sentence: {
    type: String,
    required: true,
    min: 3,
  },
  filteredSentence: {
    type: String,
    required: true,
    min: 3,
  },
});

const Sentence = mongoose.model<SentenceDocument>('Sentence', sentenceSchema);

export default Sentence;