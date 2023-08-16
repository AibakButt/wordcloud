import Sentence from '../../models/sentence.model';
import redisClient from '../../redis';
import { removeCommonWords } from '../../utils/removeCommonWords';

export const sentenceResolvers = {
  Query: {
    getWordCloud: async (_: any, { length }: { length: number }) => {

      const cacheKey = `wordCloudCache:${length}`;

      // Check if the data is present in cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const pipeline: any[] = [
        {
          $project: {
            _id: 0,
            words: { $split: ["$filteredSentence", " "] },
          },
        },
        { $unwind: "$words" },
        {
          $group: {
            _id: "$words",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $skip: 1 },
        { $limit: length },
        {
          $project: {
            _id: 0,
            word: "$_id",
            count: 1,
          },
        },
      ];
    
      const wordCloud = await Sentence.aggregate(pipeline);
      
      //Update the cache
      const cacheExpiration = 3600; 
      await redisClient.setex(cacheKey, cacheExpiration, JSON.stringify(wordCloud));
      
      return wordCloud;
    },
    
  },

  Mutation: {
    addSentence: async (_: any, { sentence }: { sentence: string }) => {
      const sentences = sentence.split('.').map((sentence: string) => ({
        sentence,
        filteredSentence: removeCommonWords(sentence)
      }));
    
      try {
        const newSentences = await Sentence.insertMany(sentences);
        return newSentences;
      } catch (error) {
        console.error('Error inserting sentences:', error);
        throw error;
      }
    },

    clearSentences: async () => {
      await Sentence.deleteMany();
      return true;
    },
  },
};
