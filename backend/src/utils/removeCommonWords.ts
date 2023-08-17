import { COMMON_WORDS_SET } from './constants';

export function removeCommonWords(sentence: string) {
  const words = sentence.split(' ');

  const filteredWords = words.filter(word => !COMMON_WORDS_SET.has(word.toLowerCase()));

  const filteredSentence = filteredWords.join(' ');

  return filteredSentence;
}