import ClearButton from '@/component/ClearButton';
import SentenceForm from '@/component/SentenceForm';
import WordCloud from '@/component/WordCloud';
import { GET_WORD_CLOUD } from '@/graphql/queries/sentences';
import { useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';

function Home() {
  const DEFAULT_WORDS_LENGTH = 10
  const [wordLength, setWordLength] = useState(DEFAULT_WORDS_LENGTH);

  const updateWordLength = useCallback((value: number) => {

    if(value < 0) {
      alert("Word Length must be greater than 0")
      return;
    }

    setWordLength(value)

  },[setWordLength])

  const [runQuery, { loading, data, error }] = useLazyQuery(GET_WORD_CLOUD)

  const handleGetWordCloud = () => {
    runQuery({ variables: { length: wordLength } })
  }

  useEffect(() => {
    runQuery({ variables: { length: DEFAULT_WORDS_LENGTH } }) //Run query with default length
  }, [runQuery])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Word Cloud App</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <SentenceForm wordLength={wordLength} setWordLength={updateWordLength} getWordCloud={handleGetWordCloud} />
          <ClearButton />
        </div>
        <div>
          {
             loading && <p>Loading...</p>
          }
          {
             error && <p>Error: {error.message}</p>
          }
          {
            !loading && !error && <WordCloud wordCloud={data?.getWordCloud} /> 
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
