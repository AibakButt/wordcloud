// frontend/components/ClearButton.tsx
import React from 'react';
import { useMutation } from '@apollo/client';
import { CLEAR_SENTENCES } from '@/graphql/mutations/sentence';
import { GET_WORD_CLOUD } from '@/graphql/queries/sentences';


function ClearButton() {
  const [clearSentences] = useMutation(CLEAR_SENTENCES, { refetchQueries: [GET_WORD_CLOUD]});

  const handleClear = async () => {
    await clearSentences();
  };

  return (
    <div>
      <button
        onClick={handleClear}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
  );
}

export default ClearButton;
