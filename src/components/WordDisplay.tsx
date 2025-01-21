import React from 'react';
import { cn } from "@/lib/utils";

interface WordDisplayProps {
  word: string;
  input: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, input }) => {
  return (
    <div className="mb-12">
      <h2 className="word-display">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className={cn(
              "transition-colors duration-150",
              input[index] === undefined ? "text-white/50" :
              input[index] === char ? "text-green-400" :
              "text-red-400"
            )}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default WordDisplay;