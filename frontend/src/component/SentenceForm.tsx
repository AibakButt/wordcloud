import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SENTENCE } from '@/graphql/mutations/sentence';
import { GET_WORD_CLOUD } from '@/graphql/queries/sentences';

interface ISentenceForm {
  setWordLength: (length: number) => void;
  wordLength: number;
  getWordCloud: () => void
}

const SentenceForm: FC<ISentenceForm> = ({ wordLength, setWordLength, getWordCloud }) => {
  const [sentence, setSentence] = useState('');


  const [addSentence] = useMutation(ADD_SENTENCE);


  const handleAddSentence = () => {
    try {
      if(sentence === "") {
        alert("Sentence cannot be empty");
        return;
      }
      addSentence({
        variables: { sentence: sentence.toLowerCase() }, 
        refetchQueries: [
          {
            query: GET_WORD_CLOUD,
            variables: { length: wordLength },
          },
        ],
      })
      setSentence('')
    } catch (error) {
      console.error('Error adding sentence:', error);
    }
  };

  return (
    <div className='bg-red'>
      <h2 className="text-lg font-semibold mb-2">Add Sentence</h2>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Enter a sentence..."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="p-2 border rounded w-full caret-blue-500 focus:caret-indigo-500"
        />
        <button
          type="button"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 button"
          onClick={handleAddSentence}
        >
          Add
        </button>
        <h2 className="text-lg font-semibold mb-2">Length:</h2>
        <input
          type="number"
          min={1}
          placeholder="Words Length"
          value={wordLength}
          onChange={(e) => setWordLength(Number(e.target.value))}
          className="p-2 mb-2 border rounded w-full caret-blue-500 focus:caret-indigo-500"
        />
        <button
          onClick={() => getWordCloud()}
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 button"
        >
          Generate Word Cloud
        </button>
      </form>

    </div>
  );
}

export default SentenceForm;
