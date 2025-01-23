import React from 'react';

interface ResultsProps {
  score: number;
  wpm?: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, wpm, onRestart }) => {
  return (
    <div className="results-container">
      <h2 className="text-4xl font-bold mb-4">Time's Up!</h2>
      <div className="space-y-2">
        <p className="text-2xl">Score: {score}</p>
        {wpm !== undefined && <p className="text-2xl">Words per minute: {wpm}</p>}
      </div>
      <button
        onClick={onRestart}
        className="mt-8 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;