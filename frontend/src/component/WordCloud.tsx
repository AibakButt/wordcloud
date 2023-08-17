import React, { FC, useCallback, useEffect, useRef } from 'react';

export type Word = {
  word: string;
  count: number;
}
interface IWordCloud {
  wordCloud: Array<Word>;
}

const WordCloud: FC<IWordCloud> = ({
  wordCloud,
}) => {

  const canvasRef = useRef(null);

  const maxFontSize = 48; 
  const minFontSize = 14; 
  const padding = 10; 

  const calculateFontSize = useCallback((length: number) => {
    const percentage = (length - 1) / (wordCloud?.length - 1);
    return minFontSize + percentage * (maxFontSize - minFontSize);
  },[wordCloud?.length]);

  const calculateColor = useCallback((length: number, index: number) => {
    const hue = (index / wordCloud?.length) * 360;
    return `hsl(${hue}, 70%, 50%)`;
  }, [wordCloud?.length]);

  const calculateCanvasSize = (wordCloudLength: number | undefined) => {
    const baseSize = 400; 
    const minSize = 400;
    const scaleFactor = 90; 

    if (wordCloudLength && wordCloudLength > 0) {
      const dynamicSize = baseSize * (wordCloudLength / scaleFactor); 
      return Math.max(minSize, dynamicSize);
    }
    return baseSize;
  };

  
  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
  
      const canvasSize = calculateCanvasSize(wordCloud?.length);
      canvas.width = canvasSize;
      canvas.height = canvasSize;
  
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
  
      if (wordCloud?.length === 1) {
        const wordObj = wordCloud[0];
        const fontSize = calculateFontSize(wordObj.count);
        const color = calculateColor(wordObj.count, 0);
  
        context.font = `${fontSize}px Arial`;
        context.fillStyle = color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
  
        const rotation = getRandomRotation();
        context.save();
        context.translate(centerX, centerY);
        context.rotate((rotation * Math.PI) / 180);
  
        context.fillText(wordObj.word, 0, 0);
  
        context.restore();
      } else {
        const positions: Array<{ x: number; y: number }> = [];
  
        wordCloud?.forEach((wordObj: Word, index: number) => {
          const fontSize = calculateFontSize(wordObj.count);
          const color = calculateColor(wordObj.count, index);
          const rotation = getRandomRotation();
  
          context.font = `${fontSize}px Arial`;
          context.fillStyle = color;
  
          let x: number = 0;
          let y: number = 0;
          let collision = true;
  
          while (collision) {
            const angle = Math.random() * 360;
            const distance = Math.random() * (canvas.width / 2 - fontSize);
            x = centerX + Math.cos(angle) * distance;
            y = centerY + Math.sin(angle) * distance;
  
            collision = positions.some(
              (position: { x: number; y: number }) =>
                Math.sqrt(
                  Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2)
                ) < fontSize + padding
            );
          }
  
          positions.push({ x, y });
  
          context.save();
          context.translate(x, y);
          context.rotate((rotation * Math.PI) / 180);
  
          context.fillText(wordObj.word, -fontSize / 2, fontSize / 2);
  
          context.restore();
        });
      }
    }
  }, [wordCloud, calculateColor, calculateFontSize]);

  const getRandomRotation = () => Math.random() * 60 - 30;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Word Cloud (Total Words): {wordCloud?.length}</h2>
      <ul className="max-h-60 overflow-y-auto border-2 border-stone-400 p-2">
        {wordCloud?.map((word: Word, index: number) => (
          <li key={index} className="mb-1">
            {word.word}: {word.count}
          </li>
        ))}
      </ul>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default WordCloud;
